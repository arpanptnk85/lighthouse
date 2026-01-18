from django.urls import path
from .views import UpgradePlanView, UsageView

urlpatterns = [
    path("upgrade/", UpgradePlanView.as_view(), name="billing-upgrade"),
    path("usage/", UsageView.as_view(), name="billing-usage"),
]
