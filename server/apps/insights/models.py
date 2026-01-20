from django.db import models
from django.contrib.auth import get_user_model

from apps.accounts.models import Organization
from apps.datasets.models import Dataset
from apps.playground.models import AskRun

User = get_user_model()


class Insight(models.Model):
    """
    Persisted, reusable outcome derived from an Ask.
    """

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="insights",
    )

    dataset = models.ForeignKey(
        Dataset,
        on_delete=models.CASCADE,
        related_name="insights",
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
    )

    ask_run = models.ForeignKey(
        AskRun,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="insights",
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    result = models.JSONField()
    schema_snapshot = models.JSONField()

    is_starred = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["organization"]),
            models.Index(fields=["dataset"]),
            models.Index(fields=["is_starred"]),
        ]

    def __str__(self):
        return self.title
