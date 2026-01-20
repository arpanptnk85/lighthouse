from django.contrib import admin
from apps.insights.models import Insight


@admin.register(Insight)
class InsightAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "dataset",
        "created_by",
        "is_starred",
        "created_at",
    )
    list_filter = ("is_starred", "dataset")
    search_fields = ("title",)
    readonly_fields = (
        "organization",
        "dataset",
        "created_by",
        "ask_run",
        "result",
        "schema_snapshot",
        "created_at",
        "updated_at",
    )
