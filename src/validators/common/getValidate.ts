export const useValidator =
  <V>(validator: (reqBody: V) => V) =>
  (reqBody: V) => {
    if (!reqBody || typeof reqBody !== 'object')
      throw new Error('Request body is missing'); //Can this happen?
    //TODO: Respond to zod validation here - !!This is wrong, change once validation is implemented !!
    const validationResponse = validator(reqBody);
    return reqBody;
  };
