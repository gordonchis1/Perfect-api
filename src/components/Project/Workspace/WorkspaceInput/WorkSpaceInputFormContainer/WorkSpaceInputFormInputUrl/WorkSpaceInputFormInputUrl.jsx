import { useEffect, useState } from "react";
import useFileManagerContext from "../../../../../../Hooks/FileManager/useFileMangerContext";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import "./WorkSpaceInputFormInputUrl.css";

export default function WorkSpaceInputFormInputUrl() {
  const [content] = useWorkSpaceContentContext();
  const [filesState] = useFilesContext();
  const [, dispatchFileManagerState] = useFileManagerContext();
  const [inputValue, setInputValue] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    if (filesState.currentFile && content.url.inputUrl !== inputValue) {
      setInputValue(content.url.inputUrl || "");
    }
  }, [filesState, content.url.inputUrl]);

  const handleChangeUrl = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (!filesState.currentFile) return;

    let newParseUrl = inputValue;

    try {
      const url = new URL(inputValue);
      newParseUrl = url.href;

      const params = new URLSearchParams(url.search);

      for (const [key, value] of params.entries()) {
        console.log(key, value);
      }
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
