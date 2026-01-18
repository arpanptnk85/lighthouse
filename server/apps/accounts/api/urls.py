from django.urls import path
from apps.accounts.api import views as account

urlpatterns = [
    path('login/', account.LoginView.as_view()),
    path('logout/', account.LogoutView.as_view()),
    path('token/refresh/', account.RefreshTokenView.as_view()),
    path('me/', account.MeView.as_view()),
    path('select-organization/', account.SelectOrganizationView.as_view()),
    path('organizations/', account.OrganizationListView.as_view()),
    path('switch-organization/', account.SwitchOrganizationView.as_view()),
    path('organizations/create/', account.CreateOrganizationView.as_view()),
    path('organizations/invite/', account.InviteUserView.as_view()),
    path('organizations/accept-invite/', account.AcceptInviteView.as_view()),
]
