from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.accounts.permissions import IsOrgAdmin
from apps.billing.plans import Plan
from apps.billing.usage import get_usage, get_limit
from apps.accounts.services.organization import activate_subscription

class UpgradePlanView(APIView):
    permission_classes = [IsAuthenticated, IsOrgAdmin]

    def post(self, request):
        org = request.organization
        target_plan = request.data.get("plan")

        if target_plan not in [Plan.STARTER, Plan.PRO, Plan.ENTERPRISE]:
            return Response(
                {"detail": "Invalid plan"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # No downgrades or same-plan upgrades
        if org.plan == target_plan and org.subscription_active:
            return Response(
                {"detail": "Already on this plan"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Mock upgrade: apply immediately
        activate_subscription(org=org, plan=target_plan)

        return Response(
            {
                "plan": org.plan,
                "trial_active": False,
            },
            status=status.HTTP_200_OK,
        )


# Usage View
class UsageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        org = request.organization

        usage = get_usage(str(org.id))
        limit = get_limit(org.plan)

        return Response({
            "used": usage,
            "limit": limit,
            "remaining": None if limit is None else max(limit - usage, 0),
        })