class OrgRole:
    OWNER = "owner"
    ADMIN = "admin"
    MEMBER = "member"

    CHOICES = (
        (OWNER, "Owner"),
        (ADMIN, "Admin"),
        (MEMBER, "Member"),
    )

    ADMIN_ROLES = {OWNER, ADMIN}
