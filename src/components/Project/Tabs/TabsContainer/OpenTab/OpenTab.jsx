import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./OpenTab.css";
import { faClose, faFile } from "@fortawesome/free-solid-svg-icons";
import useFilesContext from "../../../../../Hooks/useFilesContext";
import { FILES_REDUCER_ACTIONS } from "../../../../../providers/FilesProvider/reducer";
import useFileManagerContext from "../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../providers/FileManager/reducer";

export default function OpenTab({ file }) {
  const [, dispatch] = useFilesContext();
  const [, fileManagerDispatch] = useFileManagerContext();
  return (
    <div
      className={`tabs_open-tab ${file.currentTab ? "tabs_current-tab" : ""}`}
      onClick={() => {
        if (file.currentTab) return;
        dispatch({
          type: FILES_REDUCER_ACTIONS.changeCurrentTab,
          payload: { id: file.id },
        });
      }}
    >
      <FontAwesomeIcon icon={faFile} />
      <span>{file.name}</span>
      <button
        className="tabs_open-tab-close-button"
        onClick={(event) => {
          event.stopPropagation();
          dispatch({
            type: FILES_REDUCER_ACTIONS.closeFile,
            payload: { id: file.id },
          });
          fileManagerDispatch({
            type: FILEMANAGER_REDUCER_ACTIONS.toggleIsOpen,
            payload: { path: file.path, type: "file" },
          });
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
}
