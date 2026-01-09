import { Editor } from "@monaco-editor/react";
import "./UrlFormerBodyEditor.css";
import { useEffect, useState } from "react";
import LoaderSpiner from "../../../../../../Global/LoaderSpiner/LoaderSpiner";
import { useUserConfigStore } from "../../../../../../../stores/UserConfigStore";
import { useProjectStore } from "../../../../../../../stores/ProjectStore";

export default function UrlFormerBodyEditor({ language }) {
  const config = useUserConfigStore((state) => state.config);
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );

  const [updatedContent, setUpdatedContent] = useState(
    content?.body?.raw || ""
  );
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile
  );

  useEffect(() => {
    setUpdatedContent(content?.body?.raw || "");
  }, [content]);

  const handleChangeEditor = (value) => {
    updateContentOfOpenFile(currentFileId, {
      ...content,
      body: {
        ...content.body,
        raw: value,
      },
    });
  };

  return (
    <Editor
      loading={<LoaderSpiner size={"70px"} />}
      value={updatedContent}
      width={"100%"}
      height={"100%"}
      theme={config.preferences.editor.editorTheme || "vs-dark"}
      language={language}
      onChange={(value) => {
        handleChangeEditor(value);
        setUpdatedContent(value);
      }}
      options={{
        fontSize: config.preferences.editor.editorFontSize,
        minimap: {
          enabled: config.preferences.editor.editorMiniMap || false,
        },
        placeholder: "// El contenido del body aqui",
      }}
    ></Editor>
  );
}
