export const METHOD_WITH_BODY = ["POST", "PUT", "PATCH", "DELETE"];

export const canHaveBody = (type) => {
  if (METHOD_WITH_BODY.includes(type)) return true;

  return false;
};
