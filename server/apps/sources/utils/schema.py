from jsonschema import Draft7Validator
from jsonschema.exceptions import ValidationError


class SchemaValidationError(Exception):
    """Raised when payload does not match declared JSON schema."""


def validate_schema(schema: dict, payload: dict) -> None:
    """
    Validates payload against a JSON Schema (Draft-07).

    - Full structural validation
    - Enforces required fields
    - Enforces nested objects / arrays
    - Enforces enums, formats, types

    Raises:
        SchemaValidationError with clear message on failure
    """

    if not isinstance(schema, dict):
        raise SchemaValidationError("Schema must be a valid JSON object")

    if not isinstance(payload, dict):
        raise SchemaValidationError("Payload must be a JSON object")

    try:
        validator = Draft7Validator(schema)
        errors = sorted(validator.iter_errors(payload), key=lambda e: e.path)

        if errors:
            first_error = errors[0]

            path = ".".join([str(p) for p in first_error.absolute_path])
            location = f" at '{path}'" if path else ""

            raise SchemaValidationError(
                f"Schema validation failed{location}: {first_error.message}"
            )

    except ValidationError as exc:
        raise SchemaValidationError(str(exc)) from exc

