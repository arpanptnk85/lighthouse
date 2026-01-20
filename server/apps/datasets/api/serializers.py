from rest_framework import serializers
from apps.datasets.models import Dataset, DatasetVersion, DatasetRow


class DatasetSerializer(serializers.ModelSerializer):
    source_name = serializers.CharField(source="source.source.type", read_only=True)

    class Meta:
        model = Dataset
        fields = [
            "id",
            "name",
            "source_name",
            "created_at",
            "is_active",
        ]


class DatasetVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetVersion
        fields = [
            "id",
            "run_type",
            "status",
            "record_count",
            "error_message",
            "started_at",
            "completed_at",
        ]

class DatasetHistorySerializer(serializers.ModelSerializer):
    """
    Combines DatasetVersion into a Playground-friendly HistoryItem.
    """

    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    starred = serializers.SerializerMethodField()

    class Meta:
        model = DatasetVersion
        fields = [
            "id",
            "title",
            "description",
            "timestamp",
            "status",
            "starred",
        ]

    def get_title(self, obj):
        return f"Dataset sync ({obj.run_type})"

    def get_description(self, obj):
        if obj.status == "success":
            return f"Ingested {obj.record_count} records"
        if obj.status == "failed":
            return obj.error_message or "Sync failed"
        return "Sync in progress"

    def get_timestamp(self, obj):
        return obj.started_at.isoformat()

    def get_status(self, obj):
        if obj.status == "pending":
            return "running"
        if obj.status == "success":
            return "completed"
        return "failed"

    def get_starred(self, obj):
        # MVP: no starring yet
        return False



class DatasetRowPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetRow
        fields = ["data"]
