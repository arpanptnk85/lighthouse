from rest_framework import serializers
from apps.sources.models import DataSource, CustomAPISource


class JSONSchemaField(serializers.JSONField):
    """
    Minimal schema guard for MVP.
    Accepts dict-only payloads.
    """
    def to_internal_value(self, data):
        if not isinstance(data, dict):
            raise serializers.ValidationError("Schema must be a JSON object.")
        return super().to_internal_value(data)


class CustomAPISourceCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=128)
    base_url = serializers.URLField()
    auth_type = serializers.ChoiceField(
        choices=[CustomAPISource.AUTH_NONE, CustomAPISource.AUTH_API_KEY],
        default=CustomAPISource.AUTH_NONE,
    )
    api_key = serializers.CharField(required=False, allow_blank=True)
    schema = JSONSchemaField()

    def validate(self, attrs):
        auth_type = attrs.get("auth_type")
        api_key = attrs.get("api_key")

        if auth_type == CustomAPISource.AUTH_API_KEY and not api_key:
            raise serializers.ValidationError(
                {"api_key": "API key is required when auth_type is api_key."}
            )

        return attrs


class CustomAPISourceListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="source.id")
    name = serializers.CharField(source="source.name")
    is_active = serializers.BooleanField(source="source.is_active")
    created_at = serializers.DateTimeField(source="source.created_at")
    schema = JSONSchemaField()

    class Meta:
        model = CustomAPISource
        fields = (
            "id",
            "name",
            "schema",
            "base_url",
            "auth_type",
            "last_synced_at",
            "is_active",
            "created_at",
        )
