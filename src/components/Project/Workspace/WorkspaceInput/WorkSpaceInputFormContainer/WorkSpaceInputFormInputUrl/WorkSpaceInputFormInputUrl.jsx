import { useEffect, useState } from "react";
import useFileManagerContext from "../../../../../../Hooks/FileManager/useFileMangerContext";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import "./WorkSpaceInputFormInputUrl.css";
import { useProjectStore } from "../../../../../../stores/ProjectStore";

export default function WorkSpaceInputFormInputUrl() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );
  const [filesState] = useFilesContext();
  const [, dispatchFileManagerState] = useFileManagerContext();
  const [inputValue, setInputValue] = useState(content.url.inputUrl);
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    if (filesState.currentFile) {
      setInputValue(content.url.inputUrl || "");
    }
  }, [filesState, content.url.inputUrl]);

  const handleChangeUrl = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (!filesState.currentFile) return;
    if (inputValue === undefined) return;

    let newParseUrl = inputValue;

    try {
      const url = new URL(inputValue);
      newParseUrl = url.href;

      setIsValidUrl(true);
    } catch {
      setIsValidUrl(false);
    }

    if (
      content.url.inputUrl === inputValue &&
      content.url.parseUrl === newParseUrl
    ) {
      return;
    }

    dispatchFileManagerState({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesState.currentFile,
        newContent: {
          ...content,
          url: {
            ...content.url,
            inputUrl: inputValue,
            parseUrl: newParseUrl,
          },
        },
      },
    });
  }, [inputValue]);

  return (
    <input
      onChange={handleChangeUrl}
      type="text"
      placeholder="URL"
      value={inputValue}
      className="workspace-input-form_url-input"
      style={{ border: isValidUrl ? "" : "1px solid red" }}
    />
  );
}
