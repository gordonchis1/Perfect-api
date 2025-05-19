import { useEffect, useRef } from "react";
import "./OpenTabRenameForm.css";
import useFileManagerContext from "../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../providers/FileManager/reducer";
import useProjectContext from "../../../../../Hooks/FileManager/useProjectContext";

export default function OpenTabRenameForm({ setIsRename, isRename, file }) {
  const inputRef = useRef(null);
  const [fileManagerState, dispatchFileManager] = useFileManagerContext();
  const { id } = useProjectContext();

  const handleChange = (event) => {
    event.preventDefault();
    setIsRename(false);
    if (event.target.value === "" || event.target.value === file.name) return;
    if (fileManagerState) {
      const node = fileManagerState.getNodeById(file.id);
      if (node) {
        const path = fileManagerState.getAbsolutePath(node);
        dispatchFileManager({
          type: FILEMANAGER_REDUCER_ACTIONS.rename,
          payload: {
            type: "file",
            newName: event.target.value,
            path,
            id,
          },
        });
      }
    }
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
