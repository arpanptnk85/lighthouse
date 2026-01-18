import uuid
from django.db import models
from django.utils import timezone
from datetime import timedelta

from apps.accounts.models import Organization, User


class OrganizationInvite(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="invites",
    )

    email = models.EmailField()
    role = models.CharField(
        max_length=20,
        choices=(
            ("admin", "Admin"),
            ("member", "Member"),
        ),
    )

    invited_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="sent_invites",
    )

    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    accepted_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "organization_invites"
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["token"]),
        ]
        unique_together = ("organization", "email")

    @property
    def is_expired(self) -> bool:
        return timezone.now() > self.expires_at

    @classmethod
    def create_invite(cls, *, organization, email, role, invited_by):
        return cls.objects.create(
            organization=organization,
            email=email,
            role=role,
            invited_by=invited_by,
            expires_at=timezone.now() + timedelta(days=7),
        )
