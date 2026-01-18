from django.utils.timezone import now

def is_trial_active(org):
    if not org.trial_ends_at:
        return False
    return now() <= org.trial_ends_at

def has_dashboard_access(org):
    if org.subscription_active:
        return True

    return is_trial_active(org)
