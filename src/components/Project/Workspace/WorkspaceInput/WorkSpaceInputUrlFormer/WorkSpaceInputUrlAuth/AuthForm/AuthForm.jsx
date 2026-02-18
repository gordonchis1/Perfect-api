import "./AuthForm.css";
import AuthFormInput from "./AuthFormInput/AuthFormInput";
import { useProjectStore } from "../../../../../../../stores/ProjectStore";
import { AUTH_TYPES } from "../../../../../../../utils/constants/AUTH_TYPES.JS";
import AuthFormSelector from "./AuthFormSelector/AuthFormSelector";

export default function AuthForm({ fields, type }) {
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );
  const updateContentofOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile,
  );

  const handleUpdateAuthData = (fieldName, value) => {
    updateContentofOpenFile(currentFileId, {
      ...content,
      auth: {
        ...content.auth,
        data: {
          ...content?.auth?.data,
          [fieldName]: value.target.value,
        },
      },
    });
  };

  return fields?.map((field) => {
    switch (field.type) {
      case "text":
      case "password":
        return (
          <AuthFormInput
            key={field.name}
            field={field}
            onChange={(value) => handleUpdateAuthData(field.name, value)}
            value={
              content?.auth?.data?.[field?.name] ||
              AUTH_TYPES[type]?.defaultData[field?.name]
            }
          />
        );
      case "selector":
        return (
          <AuthFormSelector
            field={field}
            options={field.options}
            value={
              content?.auth?.data?.[field?.name] ||
              AUTH_TYPES[type]?.defaultData[field?.name]
            }
          />
        );
    }
  });
}
