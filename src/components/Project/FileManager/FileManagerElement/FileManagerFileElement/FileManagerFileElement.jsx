import "./FileManagerFileElement.css";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";
import { useRef, useState } from "react";
import FileManagerDraggableElement from "../FileManagerDraggableElement/FileManagerDraggableElement";
import useFileManagerContext from "../../../../../Hooks/FileManager/useFileMangerContext";
import useFilesContext from "../../../../../Hooks/useFilesContext";
import { FILES_REDUCER_ACTIONS } from "../../../../../providers/FilesProvider/reducer";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../providers/FileManager/reducer";
import IsRuningIndicator from "../../../../Global/IsRuningIndicator/IsRuningIndicator";
import { File } from "lucide-react";

export default function FileManagerFileElement({
  node,
  onContextMenu,
  nodeState,
  updateNodeState,
}) {
  const FilemanagerElementContainerRef = useRef(null);
  const [draggin, setDraggin] = useState(false);

  const [state, fileManagerDispatch] = useFileManagerContext();
  const absolutePath = state.getAbsolutePath(node);
  const level = absolutePath.split("/").length;

  const [filesState, dispatch] = useFilesContext();

  return (
    <div
      className="filemanager-element-container"
      ref={FilemanagerElementContainerRef}
      style={
        draggin
          ? { position: "absolute", opacity: ".8", background: "var(--hover)" }
          : { paddingLeft: `${level * 20}px` }
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
          color: filesState.currentFile === node.id ? "var(--primary)" : "",
          border:
            filesState.currentFile === node.id
              ? "1px solid var(--primary)"
              : "",
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
            fileManagerDispatch({
              type: FILEMANAGER_REDUCER_ACTIONS.toggleIsOpen,
              payload: { path: absolutePath, type: node.type },
            });

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
          {nodeState?.isRename ? (
            <FileManagerRenameForm
              node={node}
              nodeState={nodeState}
              updateNodeState={updateNodeState}
            />
          ) : (
            <p className="filemanager-element_name">{node.name}</p>
          )}
        </div>
      </FileManagerDraggableElement>
    </div>
  );
}
