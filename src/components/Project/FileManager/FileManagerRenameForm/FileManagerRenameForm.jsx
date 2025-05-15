import { useRef } from "react";
import UpdateProject from "../../../../utils/UpdateProject";
import { useParams } from "react-router";
import useClickAway from "../../../../Hooks/useClickAway";
import { useEffect } from "react";
import "./FileManagerRenameForm.css";
import useFileManagerContext from "../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../providers/FileManager/reducer";
import useProjectContext from "../../../../Hooks/FileManager/useProjectContext";

export default function FileManagerRenameForm({
  node,
  updateNodeState,
  nodeState,
}) {
  const inputRef = useRef(null);
  const [state, dispatch] = useFileManagerContext();
  const { id } = useProjectContext();

  const absolutePath = state.getAbsolutePath(node);

  useClickAway(inputRef, () => {
    inputRef.current.blur();
  });

  const handleBlur = (event) => {
    updateNodeState({ ...node, isRename: false });
    if (event.target.value === "" || event.target.value === node.name) {
      return;
    } else {
      dispatch({
        type: FILEMANAGER_REDUCER_ACTIONS.rename,
        payload: {
          type: node.type,
          newName: event.target.value,
          path: absolutePath,
          id,
        },
      });
    }
  };

  useEffect(() => {
    if (nodeState?.isRename && inputRef.current) {
      inputRef.current.select();
    }
  }, [nodeState?.isRename]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        inputRef.current.blur();
      }}
    >
      <input
        className="renameform-input"
        ref={inputRef}
        defaultValue={node.name}
        onBlur={handleBlur}
        autoFocus
        type="text"
        placeholder={node.name}
      />
    </form>
  );
}
