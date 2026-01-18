from django.db import models
from apps.accounts.models import Organization
from common.tenancy.managers import TenantManager


class TenantModel(models.Model):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        db_index=True,
    )

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = TenantManager()

    class Meta:
        abstract = True
