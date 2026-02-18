import { useProjectStore } from "../../stores/ProjectStore";
import updateHeaders from "../openFile/updateHeaders";

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
          const { openFiles, currentFileId } = useProjectStore.getState();
          const content = openFiles[currentFileId].content;

          updateHeaders([
            {
              key: "Authorization",
              value: `${content?.auth?.data?.prefix || "Bearer"} ${value}`,
              isActive: true,
            },
          ]);
        },
      },
      {
        label: "Prefix",
        name: "prefix",
        type: "text",
        placeholder: "Enter a prefix",
        onChange: (value) => {
          const { openFiles, currentFileId } = useProjectStore.getState();
          const content = openFiles[currentFileId].content;

          let finalPrefix = value;

          if (value == "") {
            finalPrefix = "Bearer";
          }

          updateHeaders([
            {
              key: "Authorization",
              value: `${finalPrefix} ${content?.auth?.data?.token || ""}`,
              isActive: true,
            },
          ]);
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
        onChange: (value) => {
          const { openFiles, currentFileId } = useProjectStore.getState();
          const content = openFiles[currentFileId].content;

          let addTo;

          if (content?.auth?.data?.addTo) {
            addTo = content?.auth?.data?.addTo;
          } else {
            addTo = "header";
          }

          if (addTo == "header") {
            updateHeaders([
              {
                key: value,
                value: "test value",
                isActive: true,
              },
            ]);
          }
        },
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
