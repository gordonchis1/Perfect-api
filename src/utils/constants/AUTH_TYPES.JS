export const AUTH_TYPES = {
  none: {
    label: "No Auth",
  },
  bearer: {
    label: "Bearer token",
    fields: [{}],
    deafultData: {
      prefix: "",
      key: "",
    },
  },
  apiKey: {
    label: "API Key",
    defaultData: {
      key: "",
      value: "",
      in: "",
    },
  },
};
