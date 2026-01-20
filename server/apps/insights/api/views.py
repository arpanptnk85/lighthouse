from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.playground.models import AskRun
from apps.insights.models import Insight
from apps.insights.api.serializers import InsightSerializer


class SaveInsightFromAskView(APIView):
    """
    Persist an Ask result as an Insight.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, ask_id):
        org_id = request.organization_id

        title = request.data.get("title")
        description = request.data.get("description", "")

        if not title:
            return Response(
                {"detail": "Title is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            ask = AskRun.objects.get(
                id=ask_id,
                organization_id=org_id,
                status="completed",
            )
        except AskRun.DoesNotExist:
            return Response(
                {"detail": "Ask not found or not completed"},
                status=status.HTTP_404_NOT_FOUND,
            )

        insight = Insight.objects.create(
            organization=ask.organization,
            dataset=ask.dataset,
            created_by=request.user,
            ask_run=ask,
            title=title,
            description=description,
            result=ask.response,
            schema_snapshot=ask.dataset.schema,
        )

        return Response(
            InsightSerializer(insight).data,
            status=status.HTTP_201_CREATED,
        )


class InsightListView(APIView):
    """
    List all insights for the organization.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        org_id = request.organization_id

        insights = (
            Insight.objects
            .filter(organization_id=org_id)
            .select_related("dataset")
            .order_by("-created_at")
        )

        return Response(
            InsightSerializer(insights, many=True).data
        )
    

class InsightDetailView(APIView):
    """
    Read-only insight detail.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, insight_id):
        org_id = request.organization_id

        try:
            insight = Insight.objects.get(
                id=insight_id,
                organization_id=org_id,
            )
        except Insight.DoesNotExist:
            return Response(
                {"detail": "Insight not found"},
                status=404,
            )

        return Response(InsightSerializer(insight).data)


class InsightStarToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, insight_id):
        org_id = request.organization_id

        try:
            insight = Insight.objects.get(
                id=insight_id,
                organization_id=org_id,
            )
        except Insight.DoesNotExist:
            return Response(status=404)

        insight.is_starred = not insight.is_starred
        insight.save(update_fields=["is_starred"])

        return Response({"starred": insight.is_starred})


class InsightDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, insight_id):
        org_id = request.organization_id

        try:
            insight = Insight.objects.get(
                id=insight_id,
                organization_id=org_id,
            )
        except Insight.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Permission: creator OR admin
        if (
            insight.created_by != request.user
            and request.role not in ("owner", "admin")
        ):
            return Response(
                {"detail": "Permission denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        insight.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
