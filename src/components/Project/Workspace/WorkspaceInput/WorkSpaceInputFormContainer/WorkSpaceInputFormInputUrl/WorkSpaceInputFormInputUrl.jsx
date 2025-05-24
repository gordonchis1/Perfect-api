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
    let queryParams = [];

    try {
      const url = new URL(inputValue);
      newParseUrl = url.href;

      const params = new URLSearchParams(url.search);

      for (const [key, value] of params.entries()) {
        queryParams.push({ key, value, isActive: true });
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
            queryParams,
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
