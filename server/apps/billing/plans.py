from enum import Enum

class Plan(str, Enum):
    STARTER = "starter"
    PRO = "pro"
    ENTERPRISE = "enterprise"


PLAN_LIMITS = {
    Plan.STARTER: {
        "price": 49,
        "trial_days": 7,
        "billing_period_days": 30,
    },
    Plan.PRO: {
        "price": 79,
        "trial_days": 7,
        "billing_period_days": 30,
    },
    Plan.ENTERPRISE: {
        "price": None,
        "trial_days": 0,
        "billing_period_days": None,
    },
}

