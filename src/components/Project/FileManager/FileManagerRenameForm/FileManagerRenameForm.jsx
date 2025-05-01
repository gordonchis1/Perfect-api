import { useRef } from "react";
import UpdateProject from "../../../../utils/UpdateProject";
import { useParams } from "react-router";
import useClickAway from "../../../../Hooks/useClickAway";
import { useEffect } from "react";
import "./FileManagerRenameForm.css";

export default function FileManagerRenameForm({
  node,
  updateNodeState,
  nodeState,
  updateVfs,
  absolutePath,
}) {
  const inputRef = useRef(null);
  const { id } = useParams();

  useClickAway(inputRef, () => {
    inputRef.current.blur();
  });

  const handleBlur = (event) => {
    updateNodeState({ ...node, isRename: false });
    if (event.target.value === "" || event.target.value === node.name) {
      return;
    } else {
      updateVfs((clonedVfs) => {
        if (node.type == "dir") {
          const clonedNode = clonedVfs.getDirByPath(absolutePath);
          clonedNode.rename(event.target.value);
        } else {
          const clonedNode = clonedVfs.getFileByPath(absolutePath);
          clonedNode.rename(event.target.value);
        }
        UpdateProject(clonedVfs, id);
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
