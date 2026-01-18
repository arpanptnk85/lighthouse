from functools import wraps
from rest_framework.exceptions import PermissionDenied
from common.auth.roles import has_org_role


def require_org_role(*roles):
    """
    Function-level role enforcement.
    """

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            request = args[0]

            if not has_org_role(*roles)(
                request.user,
                request.organization_id,
            ):
                raise PermissionDenied("Insufficient role")

            return func(*args, **kwargs)

        return wrapper

    return decorator
