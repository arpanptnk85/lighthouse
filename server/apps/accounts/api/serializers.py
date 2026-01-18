from django.contrib.auth import authenticate
from rest_framework import serializers

from apps.accounts.models import Organization, OrganizationMembership


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class OrganizationSelectSerializer(serializers.Serializer):
    organization_id = serializers.UUIDField()

    def validate_organization_id(self, value):
        user = self.context["request"].user

        if not OrganizationMembership.objects.filter(
            user=user,
            organization_id=value,
            is_active=True,
        ).exists():
            raise serializers.ValidationError("Invalid organization")

        return value

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

class OrganizationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ("name",)


class InviteUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    role = serializers.ChoiceField(choices=("admin", "member"))


class AcceptInviteSerializer(serializers.Serializer):
    token = serializers.UUIDField()