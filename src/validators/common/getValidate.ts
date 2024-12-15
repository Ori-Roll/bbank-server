export const getValidate =
  <V>(validator: (value: V) => boolean) =>
  (value: V) => {
    //TODO: Respond to zod validation here - !!This is wrong, change once validation is implemented !!
    const validationResponse = validator(value);
    if (!validationResponse) onValidationError('user', value);
    return value;
  };
