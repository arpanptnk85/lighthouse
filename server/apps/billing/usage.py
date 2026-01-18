from datetime import datetime
from django.conf import settings
import redis

from apps.billing.limits import PLAN_API_LIMITS

redis_client = redis.Redis.from_url(settings.REDIS_URL)

def _current_bucket():
    return datetime.utcnow().strftime("%Y-%m")

def increment_usage(org_id: str) -> int:
    key = f"usage:{org_id}:{_current_bucket()}"
    return redis_client.incr(key)

def get_usage(org_id: str) -> int:
    key = f"usage:{org_id}:{_current_bucket()}"
    value = redis_client.get(key)
    return int(value or 0)

def get_limit(plan):
    return PLAN_API_LIMITS.get(plan)
