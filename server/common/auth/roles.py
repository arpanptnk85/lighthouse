from apps.accounts.models import OrganizationMembership


def has_org_role(*allowed_roles):
    """
    Returns a callable role checker.
    """

    def checker(user, organization_id):
        return OrganizationMembership.objects.filter(
            user=user,
            organization_id=organization_id,
            role__in=allowed_roles,
            is_active=True,
        ).exists()

    return checker
