from django.urls import path
from apps.playground.api.views import DatasetAskView, DatasetUnifiedHistoryView

urlpatterns = [
    path(
        "datasets/<int:dataset_id>/ask/",
        DatasetAskView.as_view(),
    ),
    path(
        "datasets/<int:dataset_id>/history/",
        DatasetUnifiedHistoryView.as_view(),
    ),
]
