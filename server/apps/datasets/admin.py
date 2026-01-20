from django.contrib import admin

from apps.datasets.models import Dataset, DatasetVersion, DatasetRow


@admin.register(Dataset)
class DatasetAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "organization",
        "source",
        "is_active",
        "created_at",
    )
    list_filter = ("organization", "is_active")
    search_fields = ("name", "source__name")
    readonly_fields = ("created_at",)


@admin.register(DatasetVersion)
class DatasetVersionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "dataset",
        "run_type",
        "status",
        "record_count",
        "started_at",
        "completed_at",
    )
    list_filter = ("status", "run_type")
    readonly_fields = (
        "dataset",
        "run_type",
        "status",
        "record_count",
        "error_message",
        "started_at",
        "completed_at",
    )
    ordering = ("-started_at",)


@admin.register(DatasetRow)
class DatasetRowAdmin(admin.ModelAdmin):
    list_display = ("id", "dataset_version", "created_at")
    list_filter = ("dataset_version",)
    readonly_fields = ("dataset_version", "data", "created_at")
    search_fields = ("data",)
