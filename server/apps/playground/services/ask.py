from django.utils.timezone import now

from apps.playground.models import AskRun
from apps.datasets.models import DatasetVersion


class DatasetAskError(Exception):
    pass


def execute_dataset_ask(*, user, dataset, question: str) -> AskRun:
    """
    Executes a dataset-scoped Ask.
    MVP behavior:
    - Attaches latest successful dataset version
    - Returns schema + sample rows
    """

    latest_version = (
        DatasetVersion.objects
        .filter(dataset=dataset, status="success")
        .order_by("-started_at")
        .first()
    )

    if not latest_version:
        raise DatasetAskError("Dataset has no successful materialization")

    ask = AskRun.objects.create(
        organization=dataset.organization,
        dataset=dataset,
        dataset_version=latest_version,
        user=user,
        question=question,
        status="running",
    )

    try:
        # Deterministic MVP response
        sample_rows = list(
            latest_version.rows.all()[:5].values_list("data", flat=True)
        )

        response = {
            "message": "Dataset connected successfully.",
            "dataset": dataset.name,
            "dataset_version": latest_version.id,
            "schema": dataset.schema,
            "sample_rows": sample_rows,
        }

        ask.mark_success(response=response)

    except Exception as exc:
        ask.mark_failed(str(exc))

    return ask
