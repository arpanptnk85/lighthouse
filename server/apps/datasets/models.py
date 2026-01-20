from django.db import models
from django.utils.timezone import now

from apps.accounts.models import Organization
from apps.sources.models import CustomAPISource


class Dataset(models.Model):
    """
    Logical dataset derived from a source.
    Schema is snapshotted at creation time.
    """

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="datasets",
    )

    source = models.ForeignKey(
        CustomAPISource,
        on_delete=models.CASCADE,
        related_name="datasets",
    )

    name = models.CharField(max_length=255)

    schema = models.JSONField(
        help_text="Frozen JSON schema snapshot used for this dataset"
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("organization", "source")
        indexes = [
            models.Index(fields=["organization"]),
            models.Index(fields=["source"]),
        ]

    def __str__(self):
        return f"{self.name} ({self.organization_id})"


class DatasetVersion(models.Model):
    """
    Represents a single materialization run.
    Append-only.
    """

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("success", "Success"),
        ("failed", "Failed"),
    ]

    RUN_TYPE_CHOICES = [
        ("manual", "Manual"),
        ("scheduled", "Scheduled"),
    ]

    dataset = models.ForeignKey(
        Dataset,
        on_delete=models.CASCADE,
        related_name="versions",
    )

    run_type = models.CharField(
        max_length=20,
        choices=RUN_TYPE_CHOICES,
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    record_count = models.IntegerField(default=0)

    error_message = models.TextField(blank=True)

    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["dataset"]),
            models.Index(fields=["status"]),
        ]

    def mark_success(self, record_count: int):
        self.status = "success"
        self.record_count = record_count
        self.completed_at = now()
        self.save(update_fields=["status", "record_count", "completed_at"])

    def mark_failed(self, error: str):
        self.status = "failed"
        self.error_message = error
        self.completed_at = now()
        self.save(update_fields=["status", "error_message", "completed_at"])


class DatasetRow(models.Model):
    """
    Materialized record (row-level).
    JSON-first MVP design.
    """

    dataset_version = models.ForeignKey(
        DatasetVersion,
        on_delete=models.CASCADE,
        related_name="rows",
    )

    data = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["dataset_version"]),
        ]
