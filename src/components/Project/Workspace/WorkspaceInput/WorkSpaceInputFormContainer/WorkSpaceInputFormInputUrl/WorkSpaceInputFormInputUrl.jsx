import useFileManagerContext from "../../../../../../Hooks/FileManager/useFileMangerContext";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import { WORKSPACE_CONTENT_TYPES } from "../../../../../../providers/WorkSpaceContent/reducer";
import "./WorkSpaceInputFormInputUrl.css";

export default function WorkSpaceInputFormInputUrl() {
  const [content, dispatch] = useWorkSpaceContentContext();
  const [filesState] = useFilesContext();
  const [, dispatchFileManagerState] = useFileManagerContext();

  const handleChangeUrl = (event) => {
    dispatch({
      type: WORKSPACE_CONTENT_TYPES.changeUrl,
      payload: { newUrl: event.target.value },
    });

    dispatchFileManagerState({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesState.currentFile,
        newContent: { ...content, url: event.target.value },
      },
    });
  };

  return (
    <input
      onChange={handleChangeUrl}
      type="text"
      placeholder="URL"
      value={content.url}
      className="workspace-input-form_url-input"
    />
  );
}
