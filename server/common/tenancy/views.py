class TenantScopedAPIView:
    """
    Mixin for DRF views that require tenant context.
    """

    def get_organization_id(self):
        return self.request.organization_id
