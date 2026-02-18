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
        onChange: (value) => {
          const { openFiles, currentFileId, updateContentOfOpenFile } =
            useProjectStore.getState();
          const content = openFiles[currentFileId].content;

          const headers = content.headers;

          const updatedHeaders = headers.filter(
            (header) => header.key !== "Authorization",
          );

          updatedHeaders.push({
            key: "Authorization",
            value: `${content?.auth?.data?.prefix || "Bearer"} ${value}`,
            isActive: true,
          });

          updateContentOfOpenFile(currentFileId, {
            ...content,
            headers: updatedHeaders,
          });
        },
      },
      {
        label: "Prefix",
        name: "prefix",
        type: "text",
        placeholder: "Enter a prefix",
        onChange: (value) => {
          const { openFiles, currentFileId, updateContentOfOpenFile } =
            useProjectStore.getState();
          const content = openFiles[currentFileId].content;

          let finalPrefix = value;

          if (value == "") {
            finalPrefix = "Bearer";
          }
          const headers = content.headers;

          const updatedHeaders = headers.filter(
            (header) => header.key !== "Authorization",
          );

          updatedHeaders.push({
            key: "Authorization",
            value: `${finalPrefix} ${content?.auth?.data?.token || ""}`,
            isActive: true,
          });

          updateContentOfOpenFile(currentFileId, {
            ...content,
            headers: updatedHeaders,
          });
        },
      },
    ],
    defaultData: {
      prefix: "",
      token: "",
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
    onChange: () => {},
  },
};
