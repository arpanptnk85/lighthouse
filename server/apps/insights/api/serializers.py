from rest_framework import serializers
from apps.insights.models import Insight


class InsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insight
        fields = [
            "id",
            "title",
            "description",
            "result",
            "is_starred",
            "created_at",
        ]
