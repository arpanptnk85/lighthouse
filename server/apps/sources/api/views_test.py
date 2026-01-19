from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.sources.models import CustomAPISource
from apps.sources.permissions import IsOrgAdmin
from apps.sources.utils.http import fetch_external_api, ExternalAPIError
from apps.sources.utils.schema import validate_schema, SchemaValidationError


class CustomAPISourceTestView(APIView):
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

        try:
            # payload = fetch_external_api(
            #     custom.base_url,
            #     custom.auth_type,
            #     custom.api_key,
            # )
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

        preview = {}
        for key, records in payload.items():
            if isinstance(records, list):
                preview[key] = records[:10]

        return Response(
            {
                "preview": preview,
                "message": "Connection successful",
            },
            status=status.HTTP_200_OK,
        )
