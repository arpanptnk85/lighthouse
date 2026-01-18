from django.utils import timezone

from django.contrib.auth import authenticate, get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.exceptions import TokenError

from apps.accounts.api.serializers import (
    LoginSerializer,
    InviteUserSerializer,
    AcceptInviteSerializer,
    OrganizationCreateSerializer,
    OrganizationSelectSerializer,
)
from apps.accounts.models import OrganizationMembership, OrganizationInvite
from apps.accounts.services.organization import start_trial
from apps.billing.utils import is_trial_active
from apps.accounts.permissions import IsOrgAdmin
from common.auth.jwt import (
    generate_bootstrap_tokens,
    generate_tokens_for_user,
)

User = get_user_model()


# Login View
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        # 1. Try authenticate existing user
        user = authenticate(request=request, email=email, password=password)

        # 2. If authentication fails, check if user exists
        if not user:
            try:
                existing_user = User.objects.get(email=email)
            except User.DoesNotExist:
                # 3. SIGN UP PATH → create user
                user = User.objects.create_user(
                    email=email,
                    password=password,
                )
            else:
                # Existing user but wrong password
                return Response(
                    {"detail": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        if not user.is_active:
            return Response(
                {"detail": "User account is disabled"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # 4. Resolve organizations
        memberships = OrganizationMembership.objects.filter(
            user=user,
            is_active=True,
        ).select_related("organization")

        # 5. No organizations → bootstrap token
        if not memberships.exists():
            tokens = generate_bootstrap_tokens(user)
            return Response(tokens, status=status.HTTP_200_OK)

        # 6. Single organization → tenant token
        if memberships.count() == 1:
            membership = memberships.first()
            tokens = generate_tokens_for_user(
                user=user,
                organization_id=membership.organization_id,
            )
            return Response(tokens, status=status.HTTP_200_OK)

        # 7. Multiple organizations → selection required
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response(
            {
                "requires_organization_selection": True,
                "access": access_token,
                "organizations": [
                    {
                        "id": str(m.organization.id),
                        "name": m.organization.name,
                        "role": m.role,
                    }
                    for m in memberships
                ],
            },
            status=status.HTTP_200_OK,
        )

# Select Login Org View
class SelectOrganizationView(APIView):
    """
    Resolves tenant context for users belonging to multiple organizations.

    Expected token:
    - Authenticated
    - NOT bootstrap
    - NO org_id claim yet
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = getattr(request, "auth", None)

        # 1. Hard auth sanity check
        if not token:
            return Response(
                {"detail": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # 2. Bootstrap tokens are NOT allowed here
        if token.get("bootstrap"):
            return Response(
                {"detail": "Bootstrap token cannot select organization"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # 3. Token already bound to tenant → misuse
        if token.get("org_id"):
            print(f"From token {token.get('org_id')}")
            return Response(
                {"detail": "Organization already selected"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 4. Validate input
        serializer = OrganizationSelectSerializer(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)

        organization_id = serializer.validated_data["organization_id"]
        print(f"In: ORG_ID: {token.get('org_id')}")
        print(f"Out: ORG_ID: {organization_id}")

        # 5. Double-check membership (defense-in-depth)
        if not OrganizationMembership.objects.filter(
            user=request.user,
            organization_id=organization_id,
            is_active=True,
        ).exists():
            return Response(
                {"detail": "Invalid organization selection"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # 6. Issue tenant-bound tokens
        tokens = generate_tokens_for_user(
            user=request.user,
            organization_id=organization_id,
        )

        return Response(
            {
                "access": tokens["access"],
                "refresh": tokens["refresh"],
            },
            status=status.HTTP_200_OK,
        )

# Token Refresh View
class RefreshTokenView(TokenRefreshView):
    """
    Issues a new access token and rotates refresh token.
    """

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
        except InvalidToken:
            return Response(
                {"detail": "Invalid or expired refresh token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return response

# Logout View
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh = request.data.get("refresh")

        if not refresh:
            return Response(
                {"detail": "Refresh token required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh)
            token.blacklist()
        except TokenError:
            pass  # already invalid / expired

        return Response(status=status.HTTP_204_NO_CONTENT)

# Create Org View
class CreateOrganizationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = getattr(request, "auth", None)

        if not token or not token.get("bootstrap"):
            return Response(
                {"detail": "Organization already initialized"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = OrganizationCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        organization = serializer.save()

        start_trial(org=organization, plan=organization.plan)

        OrganizationMembership.objects.create(
            user=request.user,
            organization=organization,
            role="owner",
        )

        # 🔑 ISSUE TENANT TOKEN IMMEDIATELY
        tokens = generate_tokens_for_user(
            user=request.user,
            organization_id=organization.id,
        )

        return Response(
            {
                "organization": {
                    "id": str(organization.id),
                    "name": organization.name,
                    "role": "owner",
                },
                "access": tokens["access"],
                "refresh": tokens["refresh"],
            },
            status=status.HTTP_201_CREATED,
        )

# Invite User View
class InviteUserView(APIView):
    permission_classes = [IsOrgAdmin]

    def post(self, request):
        serializer = InviteUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        invite = OrganizationInvite.create_invite(
            organization_id=request.organization_id,
            email=serializer.validated_data["email"],
            role=serializer.validated_data["role"],
            invited_by=request.user,
        )

        # Email sending intentionally omitted (service hook later)

        return Response(
            {
                "invite_id": invite.id,
                "email": invite.email,
                "expires_at": invite.expires_at,
            },
            status=status.HTTP_201_CREATED,
        )

# Accept Invitation View
class AcceptInviteView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = AcceptInviteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            invite = OrganizationInvite.objects.select_related(
                "organization"
            ).get(token=serializer.validated_data["token"])
        except OrganizationInvite.DoesNotExist:
            return Response(
                {"detail": "Invalid invite"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if invite.is_expired or invite.accepted_at:
            return Response(
                {"detail": "Invite expired or already used"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        OrganizationMembership.objects.get_or_create(
            user=request.user,
            organization=invite.organization,
            defaults={"role": invite.role},
        )

        invite.accepted_at = timezone.now()
        invite.save(update_fields=["accepted_at"])

        return Response(
            {"detail": "Invite accepted"},
            status=status.HTTP_200_OK,
        )

# Account View
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        org_id = request.organization_id  # injected by auth middleware

        membership = OrganizationMembership.objects.select_related(
            "organization"
        ).get(
            user=request.user,
            organization_id=org_id,
            is_active=True,
        )

        return Response({
            "user": {
                "id": str(request.user.id),
                "email": request.user.email,
            },
            "organization": {
                "id": str(membership.organization.id),
                "name": membership.organization.name,
                "plan": membership.organization.plan,
                "trial_active": is_trial_active(membership.organization),
                "trial_ends_at": membership.organization.trial_ends_at,
                "subscription_active": membership.organization.subscription_active,
            },
            "role": membership.role,
        })

# Organizations View
class OrganizationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        org_id = request.organization_id  # injected by middleware

        memberships = (
            OrganizationMembership.objects
            .select_related("organization")
            .filter(user=request.user, is_active=True)
        )

        return Response({
            "organizations": [
                {
                    "id": str(m.organization.id),
                    "name": m.organization.name,
                    "role": m.role,
                    "is_current": str(m.organization.id) == str(org_id),
                }
                for m in memberships
            ]
        })

# Switch Organizations
class SwitchOrganizationView(APIView):
    """
    Switch tenant context for an already-authenticated user.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.auth

        # 1. Must already be tenant-bound
        current_org_id = token.get("org_id")
        if not current_org_id:
            return Response(
                {"detail": "No active organization"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = OrganizationSelectSerializer(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)

        target_org_id = serializer.validated_data["organization_id"]

        # 2. No-op guard
        if str(target_org_id) == str(current_org_id):
            return Response(
                {"detail": "Organization already selected"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # 3. Membership check
        OrganizationMembership.objects.get(
            user=request.user,
            organization_id=target_org_id,
            is_active=True,
        )

        # 4. Issue new tenant-bound tokens
        tokens = generate_tokens_for_user(
            user=request.user,
            organization_id=target_org_id,
        )

        return Response(tokens, status=status.HTTP_200_OK)
