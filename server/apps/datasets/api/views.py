from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from apps.datasets.models import Dataset, DatasetVersion, DatasetRow
from apps.datasets.api.serializers import (
    DatasetSerializer,
    DatasetHistorySerializer,
    DatasetVersionSerializer,
    DatasetRowPreviewSerializer,
)
from apps.datasets.services.materialize import materialize_custom_api_source
from apps.sources.models import CustomAPISource


class DatasetListView(APIView):
    """
    Lists datasets available to the organization.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        org_id = request.organization_id

        datasets = (
            Dataset.objects
            .filter(
                organization_id=org_id,
                is_active=True,
            )
            .select_related("source")
            .order_by("-created_at")
        )

        return Response(DatasetSerializer(datasets, many=True).data)


class DatasetVersionsView(APIView):
    """
    Shows materialization runs (history).
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, dataset_id):
        org_id = request.organization_id

        versions = DatasetVersion.objects.filter(
            dataset_id=dataset_id,
            dataset__organization_id=org_id,
        ).order_by("-started_at")

        return Response(DatasetVersionSerializer(versions, many=True).data)


class DatasetHistoryView(APIView):
    """
    Unified Runs & History endpoint for Playground.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, dataset_id):
        org_id = request.organization_id

        versions = (
            DatasetVersion.objects
            .filter(
                dataset_id=dataset_id,
                dataset__organization_id=org_id,
            )
            .order_by("-started_at")
        )

        return Response(
            DatasetHistorySerializer(versions, many=True).data
        )
    

class DatasetPreviewView(APIView):
    """
    Lightweight preview for Playground tables.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, dataset_id):
        org_id = request.organization_id
        limit = int(request.query_params.get("limit", 25))

        latest_version = (
            DatasetVersion.objects.filter(
                dataset_id=dataset_id,
                dataset__organization_id=org_id,
                status="success",
            )
            .order_by("-started_at")
            .first()
        )

        if not latest_version:
            return Response(
                {"detail": "No successful dataset version found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        rows = DatasetRow.objects.filter(
            dataset_version=latest_version
        )[:limit]

        return Response(
            {
                "version_id": latest_version.id,
                "record_count": latest_version.record_count,
                "rows": DatasetRowPreviewSerializer(rows, many=True).data,
            }
        )

class DatasetMaterializeView(APIView):
    """
    Manual materialization trigger (Admin only later).
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, source_id):
        org_id = request.organization_id

        try:
            source = CustomAPISource.objects.get(
                id=source_id,
                organization_id=org_id,
                is_active=True,
            )
        except CustomAPISource.DoesNotExist:
            return Response(
                {"detail": "Source not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        version = materialize_custom_api_source(source, run_type="manual")

        return Response(
            {
                "version_id": version.id,
                "status": version.status,
                "record_count": version.record_count,
                "error_message": version.error_message,
            },
            status=status.HTTP_201_CREATED,
        )

