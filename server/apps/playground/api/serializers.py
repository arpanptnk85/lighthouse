from rest_framework import serializers
from apps.playground.models import AskRun
from apps.datasets.models import DatasetVersion


class AskRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = AskRun
        fields = [
            "id",
            "question",
            "response",
            "status",
            "created_at",
            "completed_at",
        ]

class UnifiedHistorySerializer(serializers.Serializer):
    """
    Read-model serializer for Playground History.
    """

    id = serializers.CharField()
    title = serializers.CharField()
    description = serializers.CharField()
    timestamp = serializers.DateTimeField()
    status = serializers.ChoiceField(
        choices=["completed", "running", "failed"]
    )
    starred = serializers.BooleanField(default=False)

    @staticmethod
    def from_dataset_version(version: DatasetVersion) -> dict:
        if version.status == "pending":
            status = "running"
            description = "Dataset sync in progress"
        elif version.status == "success":
            status = "completed"
            description = f"Ingested {version.record_count} records"
        else:
            status = "failed"
            description = version.error_message or "Dataset sync failed"

        return {
            "id": f"dataset:{version.id}",
            "title": f"Dataset sync ({version.run_type})",
            "description": description,
            "timestamp": version.started_at,
            "status": status,
            "starred": False,
        }

    @staticmethod
    def from_ask_run(ask: AskRun) -> dict:
        if ask.status == "running":
            status = "running"
            description = "Ask in progress"
        elif ask.status == "completed":
            status = "completed"
            description = "Ask completed successfully"
        else:
            status = "failed"
            description = ask.error_message or "Ask failed"

        return {
            "id": f"ask:{ask.id}",
            "title": "Dataset Ask",
            "description": description,
            "timestamp": ask.created_at,
            "status": status,
            "starred": False,
        }
