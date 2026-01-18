from rest_framework.permissions import BasePermission
from apps.accounts.models import OrganizationMembership
from .constants import OrgRole

class IsOrgAdminOrOwner(BasePermission):
    def has_permission(self, request, view):
        return OrganizationMembership.objects.filter(
            user=request.user,
            organization_id=request.organization_id,
            role__in=("admin", "owner"),
            is_active=True,
        ).exists()

class IsOrgMember(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request, "organization_id")


class IsOrgAdmin(BasePermission):
    def has_permission(self, request, view):
        print(f"Roles: {OrgRole.ADMIN_ROLES}")
        print(getattr(request, "role", None))
        return getattr(request, "role", None) in OrgRole.ADMIN_ROLES


class IsOrgOwner(BasePermission):
    def has_permission(self, request, view):
        return getattr(request, "role", None) == OrgRole.OWNER

