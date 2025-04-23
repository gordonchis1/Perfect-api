import { useRef } from "react";
import useClickAway from "../../../../Hooks/useClickAway";
import "./FileManagerContextMenu.css";

export default function FileManagerContextMenu({
  node,
  x,
  y,
  closeContextMenu,
}) {
  const menuRef = useRef(null);
  useClickAway(menuRef, closeContextMenu);

  return (
    <span
      ref={menuRef}
      className="filemanager-contextmenu"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      {node.name}
    </span>
  );
}
