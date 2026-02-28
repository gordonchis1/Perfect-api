import "./WorkSpaceInputFormInputUrl.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { VariableNode } from "../../../../../../utils/lexical/variableNode";
import VariablePlugin from "../../../../../../utils/lexical/VariablePlugin";
import { UndefinedVariableNode } from "../../../../../../utils/lexical/undefinedVariableNode";
import EditorSyncPlugin from "../../../../../../utils/lexical/EditorSyncPlugin";
import EditorInitializerPlugin from "../../../../../../utils/lexical/EditorInitializerPlugin";

export default function WorkSpaceInputFormInputUrl() {
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
        <VariablePlugin />
        {/* ? plugin for sync content */}
        <EditorSyncPlugin />
        <EditorInitializerPlugin />
      </LexicalComposer>
    </div>
  );
}
