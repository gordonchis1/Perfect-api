import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import { useEffect } from "react";
import "./FileManagerRenameForm.css";
import { useProjectStore } from "../../../../stores/ProjectStore";

// TODO: evitar que pueda crear un nombre de archivo o de directorio con el mismo que la raiz /
export default function FileManagerRenameForm({ node, closeContextMenu }) {
  const inputRef = useRef(null);
  const rename = useProjectStore((store) => store.rename);
  const setRename = useProjectStore((store) => store.setRename);

  useClickAway(inputRef, () => {
    inputRef.current.blur();
  });

  const handleBlur = (event) => {
    setRename(null);
    if (event.target.value === "" || event.target.value === node.name) {
      return;
    } else {
      console.log("renaming to");
      rename(node.id, event.target.value);
    }
  };
  useEffect(() => {
    closeContextMenu();
  }, []);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.select();
    }
  }, [inputRef]);

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
