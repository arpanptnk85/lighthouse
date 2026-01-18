
from rest_framework.permissions import BasePermission
from common.auth.roles import has_org_role
from apps.billing.utils import has_dashboard_access


class IsAuthenticatedAndTenantScoped(BasePermission):
    """
    Ensures user is authenticated and request is tenant-scoped.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and hasattr(request, "organization_id")
        )


class IsOrgAdmin(BasePermission):
    """
    Restricts access to organization admins.
    """

    def has_permission(self, request, view):
        return (
            hasattr(request, "organization_id")
            and getattr(request.user, "role", None) == "admin"
        )




class HasOrganizationRole(BasePermission):
    """
    Enforces role-based access within a tenant.
    """

    required_roles: tuple[str, ...] = ()

    def has_permission(self, request, view):
        if not self.required_roles:
            return False

        return has_org_role(*self.required_roles)(
            request.user,
            request.organization_id,
        )
    


class HasDashboardAccess(BasePermission):
    def has_permission(self, request, view):
        return has_dashboard_access(request.organization)