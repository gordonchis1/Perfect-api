import { useEffect, useState } from "react";
import "./WorkSpaceInputFormInputUrl.css";
import { useProjectStore } from "../../../../../../stores/ProjectStore";

export default function WorkSpaceInputFormInputUrl() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const [inputValue, setInputValue] = useState(content.url.inputUrl);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const isRuning = useProjectStore(
    (store) => store.openFiles[store.currentFileId].isRuning
  );
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile
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

  return (
    <input
      onChange={handleChangeUrl}
      type="text"
      placeholder="URL"
      value={inputValue}
      disabled={isRuning}
      className="workspace-input-form_url-input"
      style={{ border: isValidUrl ? "" : "1px solid red" }}
    />
  );
}
