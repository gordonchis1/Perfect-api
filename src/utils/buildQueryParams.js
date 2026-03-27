export const buildQueryParams = (params = [], add = new URLSearchParams()) => {
  const queryParams = new URLSearchParams();

  add.forEach((value, key) => {
    queryParams.append(key, value);
  });

  for (let param of params) {
    if (param.isActive) {
      queryParams.append(param.key, param.value);
    }
  }

  return queryParams.toString();
};
