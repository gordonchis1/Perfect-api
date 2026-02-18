import { useProjectStore } from "../../stores/ProjectStore";

export const AUTH_TYPES = {
  none: {
    label: "No Auth",
    fields: [{}],
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
        label: "Prefix",
        name: "prefix",
        type: "text",
        placeholder: "Enter a prefix",
      },
    ],
    defaultData: {
      prefix: "",
      token: "",
    },
    apply: (finalInfo) => {
      const { openFiles, currentFileId } = useProjectStore.getState();
      const content = openFiles[currentFileId].content;
      let prefix = content?.auth?.data?.prefix;
      let finalPrefix;

      if (prefix == "") {
        finalPrefix = "Bearer";
      } else {
        finalPrefix = prefix;
      }

      finalInfo.headers["Authorization"] =
        `${finalPrefix} ${content?.auth?.data?.token}`;
    },
  },
  apiKey: {
    label: "API Key",
    defaultData: {
      key: "",
      value: "",
      addTo: "header",
    },
    fields: [
      {
        name: "key",
        type: "text",
        placeholder: "Enter a key",
        label: "Key",
      },
      {
        name: "value",
        type: "password",
        label: "Value",
        placeholder: "Enter a value",
      },
      {
        name: "addTo",
        type: "selector",
        label: "Add to",
        placeholder: "Add to",
        options: [
          {
            label: "Query params",
            name: "queryParams",
          },
          { label: "Header", name: "header" },
        ],
      },
    ],
    apply: (finalInfo) => {
      const { openFiles, currentFileId } = useProjectStore.getState();
      const content = openFiles[currentFileId].content;

      let key = content?.auth?.data?.key;
      let value = content?.auth?.data?.value;
      let addTo = content?.auth?.data?.addTo;

      if (key && value) {
        if (addTo == "header") {
          finalInfo.headers[key] = value;
        }
        if (addTo == "queryParams") {
          const url = new URL(finalInfo.finalUrl);
          const params = new URLSearchParams(url.searchParams);
          params.append(key, value);
          url.search = params.toString();
          finalInfo.finalUrl = url.toString();
        }
      }
    },
  },
};
