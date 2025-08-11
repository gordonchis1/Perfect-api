import { Editor } from "@monaco-editor/react";
import useDocsContext from "../../../../../../../Hooks/useDocsContext";
import LoaderSpiner from "../../../../../../Global/LoaderSpiner/LoaderSpiner";

export default function WorkspaceInputDocsSourceCode() {
  const [docsState] = useDocsContext();

  return (
    <Editor
      height={"98%"}
      loading={<LoaderSpiner />}
      width={"100%"}
      defaultLanguage="markdown"
      value={docsState}
      theme="vs-dark"
      language="markdown"
      path="docs.md"
      defaultPath="docs.md"
      options={{
        fontSize: 18,
        minimap: false,
        wordWrap: "off",
        wordWrapColumn: 60,
      }}
    />
  );
}
