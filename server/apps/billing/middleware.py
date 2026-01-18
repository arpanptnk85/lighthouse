from rest_framework.exceptions import Throttled
from apps.billing.usage import increment_usage, get_usage, get_limit

class UsageLimitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only enforce for tenant requests
        org = getattr(request, "organization", None)
        if not org:
            return self.get_response(request)

        limit = get_limit(org.plan)

        # Unlimited plans
        if limit is None:
            return self.get_response(request)

        usage = increment_usage(str(org.id))

        if usage > limit:
            raise Throttled(
                detail="Monthly API limit reached. Upgrade your plan."
            )

        return self.get_response(request)
