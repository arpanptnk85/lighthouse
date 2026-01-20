import httpx
from django.utils.timezone import now

from apps.datasets.models import Dataset, DatasetVersion, DatasetRow
from apps.sources.models import CustomAPISource
from apps.sources.utils.schema import validate_schema, SchemaValidationError


class DatasetMaterializationError(Exception):
    pass


def extract_records(payload: dict, schema: dict) -> list[dict]:
    """
    MVP extraction rule:
    - First top-level array property is treated as records
    """
    for key, value in payload.items():
        if isinstance(value, list):
            if all(isinstance(item, dict) for item in value):
                return value

    raise DatasetMaterializationError(
        "No valid array of records found in payload"
    )


def materialize_custom_api_source(
    source: CustomAPISource,
    run_type: str = "manual",
) -> DatasetVersion:
    """
    Fetch → Validate → Extract → Persist dataset rows.
    """

    # 1️⃣ Get or create Dataset (schema snapshot)
    dataset, _ = Dataset.objects.get_or_create(
        organization=source.source.organization,
        source=source,
        defaults={
            "name": source.source.name,
            "schema": source.schema,
        },
    )

    # 2️⃣ Create DatasetVersion
    version = DatasetVersion.objects.create(
        dataset=dataset,
        run_type=run_type,
        status="pending",
    )

    try:
        # 3️⃣ Fetch API payload
        headers = {}

        if source.auth_type == "api_key" and source.api_key:
            headers[source.auth_header or "Authorization"] = source.api_key

        with httpx.Client(timeout=30) as client:
            response = client.get(source.base_url, headers=headers)
            response.raise_for_status()
            payload = response.json()

        # 4️⃣ Validate schema
        validate_schema(dataset.schema, payload)

        # 5️⃣ Extract records
        records = extract_records(payload, dataset.schema)

        # 6️⃣ Persist rows
        DatasetRow.objects.bulk_create(
            [
                DatasetRow(
                    dataset_version=version,
                    data=row,
                )
                for row in records
            ],
            batch_size=500,
        )

        # 7️⃣ Finalize
        version.mark_success(record_count=len(records))

    except (SchemaValidationError, httpx.HTTPError, Exception) as exc:
        version.mark_failed(str(exc))

    return version
