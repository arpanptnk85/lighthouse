from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.sources.models import CustomAPISource, SourceRecord
from apps.sources.permissions import IsOrgAdmin
from apps.sources.utils.http import fetch_external_api, ExternalAPIError
from apps.sources.utils.schema import validate_schema, SchemaValidationError
from apps.billing.usage import increment_usage
from apps.datasets.services.materialize import materialize_custom_api_source


class CustomAPISourceSyncView(APIView):
    permission_classes = [IsAuthenticated, IsOrgAdmin]

    def post(self, request, id):
        try:
            custom = CustomAPISource.objects.select_related("source").get(
                source__id=id,
                source__organization=request.organization,
            )
        except CustomAPISource.DoesNotExist:
            return Response(
                {"detail": "Source not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        
        version = materialize_custom_api_source(custom, run_type="manual")

        try:
            payload = fetch_external_api(
                url=custom.base_url,
                auth_type=custom.auth_type,
                api_key=custom.api_key,
            )

        except ExternalAPIError as exc:
            return Response(
                {"detail": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_schema(custom.schema, payload)
        except SchemaValidationError as exc:
            return Response(
                {"detail": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Store raw records
        created = 0
        for key, records in payload.items():
            if isinstance(records, list):
                for record in records:
                    SourceRecord.objects.create(
                        source=custom.source,
                        payload={key: record},
                    )
                    created += 1

        custom.last_synced_at = now()
        custom.save(update_fields=["last_synced_at"])

        # Billing hook (1 sync = 1 unit for now)
        increment_usage(str(request.organization.id))

        return Response(
            {
                "records_ingested": created,
                "synced_at": custom.last_synced_at,
            },
            status=status.HTTP_200_OK,
        )
