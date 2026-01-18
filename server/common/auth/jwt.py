from datetime import timedelta
from rest_framework_simplejwt.tokens import RefreshToken


def generate_tokens_for_user(user, organization_id: str):
    """
    Generate JWT tokens with tenant context embedded.
    """
    refresh = RefreshToken.for_user(user)

    # Custom claims (DO NOT put secrets here)
    refresh["org_id"] = str(organization_id)
    refresh["email"] = user.email
    refresh["role"] = getattr(user, "role", "member")

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

def generate_bootstrap_tokens(user):
    """
    Token for users with no organizations yet.
    """
    refresh = RefreshToken.for_user(user)
    refresh["bootstrap"] = True
    refresh["email"] = user.email

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
