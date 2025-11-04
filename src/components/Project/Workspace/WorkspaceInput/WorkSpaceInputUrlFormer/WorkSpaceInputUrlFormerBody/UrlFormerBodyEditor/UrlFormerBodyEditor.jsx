import { Editor } from "@monaco-editor/react";
import "./UrlFormerBodyEditor.css";
import useWorkSpaceContentContext from "../../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { useEffect, useState } from "react";
import useFilesContext from "../../../../../../../Hooks/useFilesContext";
import useFileManagerContext from "../../../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../../providers/FileManager/reducer";
import LoaderSpiner from "../../../../../../Global/LoaderSpiner/LoaderSpiner";
import { useUserConfigStore } from "../../../../../../../stores/UserConfigStore";

export default function UrlFormerBodyEditor({ language }) {
  const config = useUserConfigStore((state) => state.config);
  const [content] = useWorkSpaceContentContext();
  const [updatedContent, setUpdatedContent] = useState(
    content?.body?.bodyContent || ""
  );
  const [filesContext] = useFilesContext();
  const [, filemanagerDispatch] = useFileManagerContext();

  useEffect(() => {
    setUpdatedContent(content?.body?.bodyContent || "");
  }, [content]);

  const handleChangeEditor = (value) => {
    filemanagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesContext.currentFile,
        newContent: {
          ...content,
          body: {
            ...content.body,
            bodyContent: value,
          },
        },
      },
    });
  };

  return (
    <Editor
      loading={<LoaderSpiner size={"70px"} />}
      value={updatedContent}
      width={"100%"}
      height={"100%"}
      theme={config.preferences.appearance.editorTheme || "vs-dark"}
      language={language}
      onChange={(value) => {
        handleChangeEditor(value);
        setUpdatedContent(value);
      }}
      options={{
        fontSize: 16,
        minimap: false,
        placeholder: "// El contenido del body aqui",
      }}
    ></Editor>
  );
}
