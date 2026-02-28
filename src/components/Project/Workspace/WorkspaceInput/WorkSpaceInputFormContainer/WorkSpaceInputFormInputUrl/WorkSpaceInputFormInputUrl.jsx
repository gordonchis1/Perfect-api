import { useEffect, useState } from "react";
import "./WorkSpaceInputFormInputUrl.css";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { VariableNode } from "../../../../../../utils/lexical/variableNode";
import VariablePlugin from "../../../../../../utils/lexical/VariablePlugin";
import { $getRoot } from "lexical";
import { UndefinedVariableNode } from "../../../../../../utils/lexical/undefinedVariableNode";
import PlainTextPreviewPlugin from "../../../../../../utils/lexical/PlainTextPreviewPlugin";

export default function WorkSpaceInputFormInputUrl() {
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );
  const [isValidUrl, setIsValidUrl] = useState(true);
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile,
  );

  function onError(error) {
    console.error(error);
  }

  const theme = {
    //...
  };

  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [VariableNode, UndefinedVariableNode],
  };

  return (
    <div className="workspace-input-form_wrapper">
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          placeholder={<span className="input-form_placeholder">URL</span>}
          contentEditable={
            <ContentEditable className="worksapce-input-form_content-editable"></ContentEditable>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState, editor) => {
            editorState.read(() => {
              const text = $getRoot().getTextContent();
              const json = editorState.toJSON();
              // console.log(text, json);
            });
            // console.log(editor.toJSON());
            // console.log(JSON.stringify(editorState));
          }}
        />
        <VariablePlugin />
        <PlainTextPreviewPlugin
          onChange={(preview) => {
            updateContentOfOpenFile(currentFileId, {
              ...content,
              url: {
                ...content.url,
                finalUrl: preview,
              },
            });
            console.log(preview);
          }}
        />
      </LexicalComposer>
    </div>
  );
}
