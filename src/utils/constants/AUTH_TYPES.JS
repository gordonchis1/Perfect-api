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
    onChange: (fieldName, value) => {
      const { openFiles, currentFileId, updateContentOfOpenFile } =
        useProjectStore.getState();
      const content = openFiles[currentFileId].content;

      let finalValue = content?.auth?.data?.token;
      if (
        content?.auth?.data?.prefix?.length <= 0 ||
        content?.auth?.data?.prefix == undefined
      ) {
        finalValue = `Bearer ${content?.auth?.data?.token}`;
      }
      if (fieldName == "prefix" && value !== "") {
        finalValue = `${value} ${content?.auth?.data?.token}`;
      }

      const headers = content.headers;

      const updatedHeaders = headers.filter(
        (header) => header.key !== "Authorization",
      );

      updatedHeaders.push({
        key: "Authorization",
        value: finalValue,
        isActive: true,
      });

      updateContentOfOpenFile(currentFileId, {
        ...content,
        headers: updatedHeaders,
      });
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
