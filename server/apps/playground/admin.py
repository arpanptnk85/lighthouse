from django.contrib import admin
from apps.playground.models import AskRun


@admin.register(AskRun)
class AskRunAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "dataset",
        "user",
        "status",
        "created_at",
        "completed_at",
    )
    list_filter = ("status", "dataset")
    search_fields = ("question",)
    readonly_fields = (
        "organization",
        "dataset",
        "dataset_version",
        "user",
        "question",
        "response",
        "status",
        "error_message",
        "created_at",
        "completed_at",
    )
