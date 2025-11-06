import { useEffect, useRef } from "react";
import "./OpenTabRenameForm.css";
import { useFilemanagerStore } from "../../../../../stores/FileManagerStore";

export default function OpenTabRenameForm({ setIsRename, isRename, file }) {
  const inputRef = useRef(null);
  const rename = useFilemanagerStore((store) => store.rename);

  const handleChange = (event) => {
    event.preventDefault();
    setIsRename(false);
    if (event.target.value === "" || event.target.value === file.name) return;

    rename(file.id, event.target.value);
  };

  useEffect(() => {
    if (isRename && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRename]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        inputRef.current.blur();
      }}
    >
      <input
        className="open-tab_renameform-input"
        defaultValue={file.name}
        type="text"
        placeholder={file.name}
        ref={inputRef}
        onBlur={handleChange}
      />
    </form>
  );
}
