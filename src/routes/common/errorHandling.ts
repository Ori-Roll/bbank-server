function onValidationError(
  parameter: string,
  value?: unknown,
  caughtErr?: string
): void {
  if (caughtErr !== undefined) {
    throw new ValidationErr(parameter, value, caughtErr);
  } else {
    throw new ValidationErr(parameter, value, 'unknown validation error'); //TODO: Is this the error for unknown validation error? When will this be thrown?
  }
}
