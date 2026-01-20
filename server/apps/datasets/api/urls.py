from django.urls import path
from apps.datasets.api.views import (
    DatasetListView,
    DatasetHistoryView,
    DatasetVersionsView,
    DatasetPreviewView,
    DatasetMaterializeView,
)

urlpatterns = [
    path('', DatasetListView.as_view()),
    path('<int:dataset_id>/versions/', DatasetVersionsView.as_view()),
    path('<int:dataset_id>/history/',DatasetHistoryView.as_view(),),
    path('<int:dataset_id>/preview/', DatasetPreviewView.as_view()),
    path('materialize/<int:source_id>/', DatasetMaterializeView.as_view()),
]
