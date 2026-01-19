from django.db import models
from apps.accounts.models import Organization


class DataSource(models.Model):
    """
    Canonical data source abstraction.
    Every integration (Custom API, Shopify, Webhooks)
    MUST map to this model.
    """

    TYPE_CUSTOM_API = "custom_api"
    TYPE_SHOPIFY = "shopify"
    TYPE_WOOCOMMERCE = "woocommerce"
    TYPE_WEBHOOK = "webhook"

    TYPE_CHOICES = [
        (TYPE_CUSTOM_API, "Custom API"),
        (TYPE_SHOPIFY, "Shopify"),
        (TYPE_WOOCOMMERCE, "WooCommerce"),
        (TYPE_WEBHOOK, "Webhook"),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="data_sources",
    )

    type = models.CharField(
        max_length=32,
        choices=TYPE_CHOICES,
    )

    name = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["organization", "type"]),
        ]

    def __str__(self):
        return f"{self.organization.name} → {self.name} ({self.type})"


class CustomAPISource(models.Model):
    """
    Custom API data source configuration.
    Pull-based, schema-defined, read-only.
    """

    AUTH_NONE = "none"
    AUTH_API_KEY = "api_key"
    AUTH_BEARER = "bearer"
    AUTH_BASIC = "basic"
    AUTH_OAUTH2 = "oauth2"

    AUTH_CHOICES = [
        (AUTH_NONE, "None"),
        (AUTH_API_KEY, "API Key"),
        (AUTH_BEARER, "earer Token"),
        (AUTH_BASIC, "Basic Auth"),
        (AUTH_OAUTH2, "OAuth 2.0"),
    ]

    source = models.OneToOneField(
        DataSource,
        on_delete=models.CASCADE,
        related_name="custom_api",
    )

    base_url = models.URLField()
    auth_type = models.CharField(
        max_length=16,
        choices=AUTH_CHOICES,
        default=AUTH_NONE,
    )

    api_key = models.TextField(
        null=True,
        blank=True,
        help_text="Stored encrypted later; plaintext allowed for MVP",
    )

    schema = models.JSONField(
        help_text="User-defined schema for Playground reasoning",
    )

    last_synced_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"Custom API → {self.source.name}"


class SourceRecord(models.Model):
    """
    Raw ingested data.
    Used by Playground and analytics layers.
    """

    source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE,
        related_name="records",
    )

    payload = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["source", "created_at"]),
        ]
