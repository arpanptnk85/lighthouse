from django.db import models


class TenantQuerySet(models.QuerySet):
    def for_organization(self, organization_id):
        return self.filter(organization_id=organization_id)

    def active(self):
        return self.filter(is_active=True)
