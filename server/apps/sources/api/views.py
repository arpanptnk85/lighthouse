from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.sources.models import DataSource, CustomAPISource
from apps.sources.permissions import IsOrgAdmin
from .serializers import (
    CustomAPISourceCreateSerializer,
    CustomAPISourceListSerializer,
)


class CustomAPISourceView(APIView):
    """
    POST → Create Custom API source (org admins only)
    GET  → List org Custom API sources
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        qs = CustomAPISource.objects.select_related("source").filter(
            source__organization=request.organization,
            source__type=DataSource.TYPE_CUSTOM_API,
        )

        serializer = CustomAPISourceListSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        self.check_permissions(request)
        if not IsOrgAdmin().has_permission(request, self):
            return Response(
                {"detail": "Only organization admins can create data sources."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = CustomAPISourceCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Create canonical DataSource
        source = DataSource.objects.create(
            organization=request.organization,
            type=DataSource.TYPE_CUSTOM_API,
            name=serializer.validated_data["name"],
        )

        # Create Custom API config
        CustomAPISource.objects.create(
            source=source,
            base_url=serializer.validated_data["base_url"],
            auth_type=serializer.validated_data["auth_type"],
            api_key=serializer.validated_data.get("api_key"),
            schema=serializer.validated_data["schema"],
        )

        return Response(
            {"id": source.id},
            status=status.HTTP_201_CREATED,
        )
