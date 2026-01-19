from django.urls import path
from .views import CustomAPISourceView
from .views_test import CustomAPISourceTestView
from .views_sync import CustomAPISourceSyncView

urlpatterns = [
    path('custom/', CustomAPISourceView.as_view()),
    path('custom/<int:id>/test/', CustomAPISourceTestView.as_view()),
    path('custom/<int:id>/sync/', CustomAPISourceSyncView.as_view()),
]