from apps.billing.plans import Plan

PLAN_API_LIMITS = {
    Plan.STARTER: 5000,
    Plan.PRO: 50000,
    Plan.ENTERPRISE: None,  # unlimited
}
