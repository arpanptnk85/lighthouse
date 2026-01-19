from django.contrib import admin
from .models import DataSource, CustomAPISource, SourceRecord


@admin.register(DataSource)
class DataSourceAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "organization", "is_active", "created_at")
    list_filter = ("type", "is_active")
    search_fields = ("name", "organization__name")


@admin.register(CustomAPISource)
class CustomAPISourceAdmin(admin.ModelAdmin):
    list_display = ("source", "base_url", "auth_type", "last_synced_at")
    search_fields = ("source__name",)


@admin.register(SourceRecord)
class SourceRecordAdmin(admin.ModelAdmin):
    list_display = ("source", "created_at")
    list_filter = ("source",)
