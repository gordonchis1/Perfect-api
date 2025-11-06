import "./FileManagerFileElement.css";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";
import { useRef, useState } from "react";
import FileManagerDraggableElement from "../FileManagerDraggableElement/FileManagerDraggableElement";
import useFilesContext from "../../../../../Hooks/useFilesContext";
import { FILES_REDUCER_ACTIONS } from "../../../../../providers/FilesProvider/reducer";
import IsRuningIndicator from "../../../../Global/IsRuningIndicator/IsRuningIndicator";
import { File } from "lucide-react";
import { useFilemanagerStore } from "../../../../../stores/FileManagerStore";

export default function FileManagerFileElement({
  node,
  onContextMenu,
  nodeState,
  closeContextMenu,
}) {
  const FilemanagerElementContainerRef = useRef(null);
  const [draggin, setDraggin] = useState(false);
  const [filesState, dispatch] = useFilesContext();
  const renameState = useFilemanagerStore((store) => store.renameId);
  const fileManagerState = useFilemanagerStore((store) => store.vfs);
  const toggleIsOpen = useFilemanagerStore((store) => store.toggleIsOpen);

  const absolutePath = fileManagerState.getAbsolutePath(node);
  const level = absolutePath.split("/").length;

  const fileFontColor = () => {
    if (filesState.currentFile === node.id) {
      return "var(--primary)";
    } else if (filesState.openFiles.some((file) => file.id == node.id)) {
      return "var(--primery-text-color)";
    }
  };

  return (
    <div
      className="filemanager-element-container"
      ref={FilemanagerElementContainerRef}
      style={
        draggin
          ? { position: "absolute", opacity: ".8", background: "var(--hover)" }
          : {}
      }
    >
      <FileManagerDraggableElement
        FilemanagerElementContainerRef={FilemanagerElementContainerRef}
        draggin={draggin}
        setDraggin={setDraggin}
        node={node}
        style={{
          background:
            filesState.currentFile === node.id
              ? "var(--primary-transparent)"
              : "",
          color: fileFontColor(),
          border:
            filesState.currentFile === node.id
              ? "1px solid var(--primary)"
              : "",
          paddingLeft: `${level * 20}px`,
        }}
        onContextMenu={onContextMenu}
        onClick={() => {
          if (filesState.currentFile === node.id) return;
          if (filesState.openFiles.some((file) => file.id === node.id)) {
            dispatch({
              type: FILES_REDUCER_ACTIONS.changeCurrentTab,
              payload: { id: node.id },
            });
          } else {
            toggleIsOpen(node.id);

            dispatch({
              type: FILES_REDUCER_ACTIONS.openFile,
              payload: {
                path: absolutePath,
                content: node.content,
                name: node.name,
                currentTab: true,
                id: node.id,
              },
            });
          }
        }}
      >
        <div className="filemanager-element-content">
          <IsRuningIndicator isRuning={node.content.isRuning} size="10px" />
          <File size={17} />
          {renameState != null && renameState == node.id ? (
            <FileManagerRenameForm
              node={node}
              nodeState={nodeState}
              closeContextMenu={closeContextMenu}
            />
          ) : (
            <p className="filemanager-element_name">{node.name}</p>
          )}
        </div>
      </FileManagerDraggableElement>
    </div>
  );
}
