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
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesState.currentFile,
        newContent: {
          ...content,
          isRuning: true,
        },
      },
    });

    try {
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
      const timeTaken = end - start;

      const contentType = response.headers.get("content-type");
      let parsedResponse;
      if (contentType && contentType.includes("application/json")) {
        parsedResponse = await response.json();
      } else {
        parsedResponse = await response.text();
      }
      const newResponse = [...content.responses];

      if (newResponse.length >= 5) {
        for (let i = 0; i < newResponse.length; i++) {
          if (!newResponse[i].isPinned) {
            newResponse.splice(i, 1);
            break;
          }
        }
      }
      newResponse.push({
        time: timeTaken,
        status: response.status,
        response: parsedResponse,
        headers: Object.fromEntries(response.headers.entries()),
        url: content.url.parseUrl,
        body: JSON.stringify(parsedResponse, null, 2),
      });

      dispatchFileManagerState({
        type: FILEMANAGER_REDUCER_ACTIONS.updateContent,
        payload: {
          newContent: {
            ...content,
            responses: newResponse,
          },
          nodeId: filesState.currentFile,
          projectId: id,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <button className="workspace-input-form_run-button" onClick={handleRun}>
      Run
    </button>
  );
}
