from rest_framework.exceptions import PermissionDenied
from common.auth.roles import has_org_role
from django.utils.timezone import now
from datetime import timedelta
from apps.billing.plans import PLAN_LIMITS, Plan


def delete_organization(*, user, organization_id):
    if not has_org_role("owner")(user, organization_id):
        raise PermissionDenied("Only owners may delete organizations")
    
    # destructive action here

def start_trial(org, plan: Plan):
    trial_days = PLAN_LIMITS[plan]["trial_days"]

    if trial_days > 0:
        org.trial_started_at = now()
        org.trial_ends_at = now() + timedelta(days=trial_days)
    else:
        org.trial_started_at = None
        org.trial_ends_at = None

    org.plan = plan
    org.subscription_active = False   # 🔴 IMPORTANT
    org.save()

def activate_subscription(org, plan: Plan):
    org.plan = plan
    org.subscription_active = True

    # Trial is over once paid
    org.trial_started_at = None
    org.trial_ends_at = None

    org.save()