from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.accounts.models import OrganizationMembership

class TenantJWTAuthentication(JWTAuthentication):
    """
    JWT authentication that supports:
    - bootstrap tokens (no org_id)
    - tenant tokens (with org_id)
    """

    def authenticate(self, request):
        result = super().authenticate(request)

        if result is None:
            return None

        user, validated_token = result

        # Attach org context if present (tenant token)
        org_id = validated_token.get("org_id")
        if org_id:
            membership = OrganizationMembership.objects.select_related(
                "organization"
            ).get(
                user=user,
                organization_id=org_id,
                is_active=True,
            )

            request.organization_id = org_id
            request.organization = membership.organization
            request.role = membership.role

        # Attach auth token for downstream checks (bootstrap detection)
        request.auth = validated_token

        return user, validated_token
