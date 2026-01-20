from django.db import models
from django.utils.timezone import now
from django.contrib.auth import get_user_model

from apps.accounts.models import Organization
from apps.datasets.models import Dataset, DatasetVersion

User = get_user_model()


class AskRun(models.Model):
    """
    Represents a question asked against a dataset version.
    """

    STATUS_CHOICES = [
        ("running", "Running"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="ask_runs",
    )

    dataset = models.ForeignKey(
        Dataset,
        on_delete=models.CASCADE,
        related_name="ask_runs",
    )

    dataset_version = models.ForeignKey(
        DatasetVersion,
        on_delete=models.CASCADE,
        related_name="ask_runs",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    question = models.TextField()

    response = models.JSONField(null=True, blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="running",
    )

    error_message = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["organization"]),
            models.Index(fields=["dataset"]),
            models.Index(fields=["status"]),
        ]

    def mark_success(self, response: dict):
        self.response = response
        self.status = "completed"
        self.completed_at = now()
        self.save(update_fields=["response", "status", "completed_at"])

    def mark_failed(self, error: str):
        self.error_message = error
        self.status = "failed"
        self.completed_at = now()
        self.save(update_fields=["error_message", "status", "completed_at"])
