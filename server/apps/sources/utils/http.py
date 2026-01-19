import httpx


class ExternalAPIError(Exception):
    pass


def fetch_external_api(
    *,
    url: str,
    auth_type: str,
    api_key: str | None = None,
    method: str = "GET",
    payload: dict | None = None,
    is_graphql: bool = False,
    timeout: int = 10,
):
    headers = {
        "Accept": "application/json",
    }

    if auth_type == "api_key" and api_key:
        headers["Authorization"] = f"Bearer {api_key}"

    try:
        with httpx.Client(timeout=timeout) as client:
            if is_graphql:
                response = client.post(
                    url,
                    headers=headers,
                    json={
                        "query": payload.get("query"),
                        "variables": payload.get("variables", {}),
                    },
                )
            else:
                response = client.request(
                    method=method,
                    url=url,
                    headers=headers,
                    json=payload,
                )

            response.raise_for_status()

            data = response.json()

            # GraphQL error surface
            if is_graphql and "errors" in data:
                raise ExternalAPIError(str(data["errors"]))

            return data

    except httpx.RequestError as exc:
        raise ExternalAPIError(f"Request failed: {exc}") from exc
    except httpx.HTTPStatusError as exc:
        raise ExternalAPIError(
            f"HTTP {exc.response.status_code}: {exc.response.text}"
        ) from exc
    except ValueError:
        raise ExternalAPIError("Invalid JSON response")
