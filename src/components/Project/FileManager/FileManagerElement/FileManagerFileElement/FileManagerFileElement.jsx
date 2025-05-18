import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faFile as faFileSolidIcon } from "@fortawesome/free-solid-svg-icons";
import "./FileManagerFileElement.css";
import FileManagerRenameForm from "../../FileManagerRenameForm/FileManagerRenameForm";
import { useRef, useState } from "react";
import FileManagerDraggableElement from "../FileManagerDraggableElement/FileManagerDraggableElement";
import useFileManagerContext from "../../../../../Hooks/FileManager/useFileMangerContext";
import useFilesContext from "../../../../../Hooks/useFilesContext";
import { FILES_REDUCER_ACTIONS } from "../../../../../providers/FilesProvider/reducer";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../providers/FileManager/reducer";

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
          : {}
      }
    >
      <FileManagerDraggableElement
        FilemanagerElementContainerRef={FilemanagerElementContainerRef}
        draggin={draggin}
        setDraggin={setDraggin}
        node={node}
        style={{
          paddingLeft: `${level * 20}px`,
          background: filesState.currentFile === node.id ? "var(--hover)" : "",
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
          <FontAwesomeIcon
            icon={
              filesState.openFiles.some((file) => file.id === node.id)
                ? faFileSolidIcon
                : faFile
            }
          />
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
