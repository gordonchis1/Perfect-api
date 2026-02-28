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

export default function WorkSpaceInputFormInputUrl() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content,
  );
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const [inputValue, setInputValue] = useState(content.url.inputUrl);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const isRunning = useProjectStore(
    (store) => store.openFiles[store.currentFileId].isRunning,
  );
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile,
  );

  useEffect(() => {
    if (currentFileId) {
      setInputValue(content.url.inputUrl || "");
    }
  }, [currentFileId, content.url.inputUrl]);

  const handleChangeUrl = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (!currentFileId) return;
    if (inputValue === undefined) return;

    let newFinalUrl = inputValue;

    try {
      const url = new URL(inputValue);
      newFinalUrl = url.href;

      setIsValidUrl(true);
    } catch {
      setIsValidUrl(false);
    }

    if (
      content.url.finalUrl === inputValue &&
      content.url.finalUrl === newFinalUrl
    ) {
      return;
    }

    updateContentOfOpenFile(currentFileId, {
      ...content,
      url: {
        ...content.url,
        inputUrl: inputValue,
        finalUrl: newFinalUrl,
      },
    });
  }, [inputValue]);

  function onError(error) {
    console.error(error);
  }

  const theme = {
    // Theme styling goes here
    //...
  };

  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [VariableNode],
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
            // console.log(editor.toJSON());
            // console.log(editorState);
          }}
        />
        <VariablePlugin />
      </LexicalComposer>
    </div>
  );
}
