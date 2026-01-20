from django.urls import path
from apps.insights.api.views import SaveInsightFromAskView, InsightListView, InsightDetailView, InsightStarToggleView, InsightDeleteView

urlpatterns = [
    path('', InsightListView.as_view()),
    path('<int:insight_id>/', InsightDetailView.as_view()),
    path("<int:insight_id>/star/", InsightStarToggleView.as_view()),
    path("<int:insight_id>/delete/", InsightDeleteView.as_view()),
    path('ask/<int:ask_id>/save/', SaveInsightFromAskView.as_view()),
]
