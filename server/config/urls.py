from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.api.urls')),
    path('api/billing/', include('apps.billing.api.urls')),
    path('api/sources/', include('apps.sources.api.urls')),
    path('api/datasets/', include('apps.datasets.api.urls')),
    path('api/playground/', include('apps.playground.api.urls')),
    path('api/insights/', include('apps.insights.api.urls')),
]
