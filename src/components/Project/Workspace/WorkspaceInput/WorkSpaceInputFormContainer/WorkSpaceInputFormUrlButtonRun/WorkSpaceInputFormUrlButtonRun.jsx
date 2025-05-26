import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import useProjectContext from "../../../../../../Hooks/FileManager/useProjectContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import useFileManagerContext from "../../../../../../Hooks/FileManager/useFileMangerContext";
import "./WorkSpaceInputFormUrlButtonRun.css";

export default function WorkSpaceInputFormUrlButtonRun() {
  const [content] = useWorkSpaceContentContext();
  const [filesState] = useFilesContext();
  const [, dispatchFileManagerState] = useFileManagerContext();
  const { id } = useProjectContext();

  const handleRun = async () => {
    if (!content.url.parseUrl) return;

    dispatchFileManagerState({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContent,
      payload: {
        newContent: content,
        nodeId: filesState.currentFile,
        projectId: id,
      },
    });

    dispatchFileManagerState({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesState.currentFile,
        newContent: {
          ...content,
          isRuning: true,
        },
      },
    });

    const start = performance.now();
    const response = await fetch(content.url.parseUrl, {
      method: content.type,
    });
    dispatchFileManagerState({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesState.currentFile,
        newContent: {
          ...content,
          isRuning: false,
        },
      },
    });
    const end = performance.now();
    console.log(`Tiempo de respuesta: ${end - start} ms`);
    const parseResponse = await response.json();
    console.log(parseResponse);
  };

  return (
    <button className="workspace-input-form_run-button" onClick={handleRun}>
      Run
    </button>
  );
}
