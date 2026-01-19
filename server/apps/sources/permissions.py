from rest_framework.permissions import BasePermission
from apps.accounts.constants import OrgRole


class IsOrgAdmin(BasePermission):
    """
    Only org admins can create or modify data sources.
    """

    def has_permission(self, request, view):
        return getattr(request, "role", None) in OrgRole.ADMIN_ROLES
