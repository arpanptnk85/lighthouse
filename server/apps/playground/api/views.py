from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.datasets.models import Dataset, DatasetVersion
from apps.playground.models import AskRun
from apps.playground.services.ask import execute_dataset_ask, DatasetAskError
from apps.playground.api.serializers import AskRunSerializer, UnifiedHistorySerializer


class DatasetAskView(APIView):
    """
    Executes an Ask against a specific dataset.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, dataset_id):
        org_id = request.organization_id
        question = request.data.get("question")

        if not question:
            return Response(
                {"detail": "Question is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            dataset = Dataset.objects.get(
                id=dataset_id,
                organization_id=org_id,
                is_active=True,
            )
        except Dataset.DoesNotExist:
            return Response(
                {"detail": "Dataset not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            ask = execute_dataset_ask(
                user=request.user,
                dataset=dataset,
                question=question,
            )
        except DatasetAskError as exc:
            return Response(
                {"detail": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            AskRunSerializer(ask).data,
            status=status.HTTP_201_CREATED,
        )


class DatasetUnifiedHistoryView(APIView):
    """
    Unified activity history for a dataset:
    - Dataset syncs
    - Dataset asks
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, dataset_id):
        org_id = request.organization_id

        dataset_versions = DatasetVersion.objects.filter(
            dataset_id=dataset_id,
            dataset__organization_id=org_id,
        )

        ask_runs = AskRun.objects.filter(
            dataset_id=dataset_id,
            organization_id=org_id,
        )

        history_items = []

        for version in dataset_versions:
            history_items.append(
                UnifiedHistorySerializer.from_dataset_version(version)
            )

        for ask in ask_runs:
            history_items.append(
                UnifiedHistorySerializer.from_ask_run(ask)
            )

        # Sort by timestamp DESC
        history_items.sort(
            key=lambda item: item["timestamp"],
            reverse=True,
        )

        return Response(history_items)