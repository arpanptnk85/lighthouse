from django.db import models
from common.tenancy.queryset import TenantQuerySet


class TenantManager(models.Manager):
    def get_queryset(self):
        return TenantQuerySet(self.model, using=self._db)

    def for_organization(self, organization_id):
        return self.get_queryset().for_organization(organization_id)

    def unsafe_all(self):
        """
        Explicit escape hatch.
        Use ONLY for admin / background jobs.
        """
        return super().get_queryset()
