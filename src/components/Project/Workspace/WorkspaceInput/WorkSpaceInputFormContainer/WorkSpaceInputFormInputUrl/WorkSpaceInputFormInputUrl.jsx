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

  useEffect(() => {
    if (filesState.currentFile) {
      setInputValue(content.url.inputUrl || "");
    }
  }, [filesState, content.url.inputUrl]);

  const handleChangeUrl = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    try {
      const url = new URL(inputValue);
      const params = new URLSearchParams(url.search);
      dispatchFileManagerState({
        type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
        payload: {
          nodeId: filesState.currentFile,
          newContent: {
            ...content,
            url: {
              ...content.url,
              inputUrl: inputValue,
              parseUrl: url.href,
            },
          },
        },
      });
      for (const [key, value] of params.entries()) {
        console.log(key, value);
      }
    } catch {
      console.log("url invalid");
    }
  }, [inputValue]);

  return (
    <input
      onChange={handleChangeUrl}
      type="text"
      placeholder="URL"
      value={inputValue}
      className="workspace-input-form_url-input"
    />
  );
}
