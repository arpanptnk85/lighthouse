from django.http import JsonResponse


class EnforceTenantContextMiddleware:
    """
    Prevents tenant-leakage by enforcing org context on API routes.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith("/api/") and not request.user.is_anonymous:
            token = getattr(request, "auth", None)

            is_bootstrap = bool(token and token.get("bootstrap"))

            if not hasattr(request, "organization_id") and not is_bootstrap:
                from django.http import JsonResponse

                return JsonResponse(
                    {"detail": "Tenant context missing"},
                    status=403,
                )

        return self.get_response(request)
