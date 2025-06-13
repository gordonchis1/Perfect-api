import { Editor } from "@monaco-editor/react";
import "./UrlFormerBodyEditor.css";
import useWorkSpaceContentContext from "../../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { useEffect, useState } from "react";
import useFilesContext from "../../../../../../../Hooks/useFilesContext";
import useFileManagerContext from "../../../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../../providers/FileManager/reducer";

export default function UrlFormerBodyEditor({ language }) {
  const [content] = useWorkSpaceContentContext();
  const [updatedContent, setUpdatedContent] = useState(
    content?.body?.bodyContent || ""
  );
  const [filesContext] = useFilesContext();
  const [, filemanagerDispatch] = useFileManagerContext();

  useEffect(() => {
    setUpdatedContent(content?.body?.bodyContent || "");
  }, [content]);

  useEffect(() => {
    filemanagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesContext.currentFile,
        newContent: {
          ...content,
          body: {
            ...content.body,
            bodyContent: updatedContent,
          },
        },
      },
    });
  }, [updatedContent]);

  return (
    <Editor
      value={updatedContent}
      width={"100%"}
      height={"100%"}
      theme="vs-dark"
      language={language}
      onChange={(value) => {
        setUpdatedContent(value);
      }}
      options={{
        fontSize: 20,
        minimap: false,
        placeholder: "El contenido del body aqui",
      }}
    ></Editor>
  );
}
