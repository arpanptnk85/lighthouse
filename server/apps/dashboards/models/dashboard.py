from django.db import models
from common.tenancy.models import TenantModel


class Dashboard(TenantModel):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = "dashboards"
        indexes = [
            models.Index(fields=["organization", "is_active"]),
        ]

    def __str__(self):
        return self.name
