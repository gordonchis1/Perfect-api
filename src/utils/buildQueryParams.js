export const buildQueryParams = (params = []) => {
  if (params.length == 0) return "";
  const queryParams = new URLSearchParams();

  for (let param of params) {
    if (param.isActive) {
      queryParams.append(param.key, param.value);
    }
  }

  return queryParams.toString();
};
