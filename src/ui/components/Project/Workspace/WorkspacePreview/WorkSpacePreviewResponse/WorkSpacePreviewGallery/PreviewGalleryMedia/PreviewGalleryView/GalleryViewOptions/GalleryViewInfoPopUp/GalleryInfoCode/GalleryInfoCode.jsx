import { Editor } from "@monaco-editor/react";
import { useUserConfigStore } from "../../../../../../../../../../../stores/UserConfigStore";
import LoaderSpiner from "../../../../../../../../../../Global/LoaderSpiner/LoaderSpiner";
import { useState } from "react";
import "./GalleryInfoCode.css";
import useCurrentEntry from "../../../../../../../../../../../Hooks/useCurrentEntry";

export default function GalleryInfoCode({ url }) {
  const config = useUserConfigStore((state) => state.config);
  const currentEntry = useCurrentEntry();
  const [line, setLine] = useState({
    startLineNumber: 1,
    startColumn: undefined,
    endLineNumber: undefined,
    endColumn: undefined,
  });

  const handleOnEditorMount = (editor, monaco) => {
    const model = editor.getModel();

    const response = model.findMatches(url, false, false, false, null, false)[0]
      .range;

    setLine({ ...response });

    editor.createDecorationsCollection([]);

    editor.createDecorationsCollection([
      {
        options: { inlineClassName: "editor-sub" },
        range: new monaco.Range(
          response.startLineNumber,
          response.startColumn,
          response.endLineNumber,
          response.endColumn
        ),
      },
    ]);
  };

  return (
    <div className="gallery-info_code-editor-container">
      <span>Codigo:</span>
      <Editor
        onMount={handleOnEditorMount}
        value={JSON.stringify(currentEntry?.response?.body?.raw, null, 2)}
        line={line.startLineNumber}
        language="json"
        width={"100%"}
        options={{
          minimap: { enabled: false },
          stickyScroll: { enabled: false },
          readOnly: true,
          fontSize: config.preferences.editor.editorFontSize,
        }}
        loading={<LoaderSpiner />}
        theme={config.preferences.editor.editorTheme || "vs-dark"}
        height={"150px"}
      />
    </div>
  );
}
