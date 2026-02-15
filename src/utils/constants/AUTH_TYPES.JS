export const AUTH_TYPES = {
  none: {
    label: "No Auth",
  },
  bearer: {
    label: "Bearer token",
    fields: [
      {
        label: "Token",
        name: "token",
        type: "password",
        placeholder: "Enter token",
      },
      {
        label: "prefix",
        name: "prefix",
        type: "text",
        placeholder: "Enter a prefix",
      },
    ],
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
    fields: [{}],
  },
};
