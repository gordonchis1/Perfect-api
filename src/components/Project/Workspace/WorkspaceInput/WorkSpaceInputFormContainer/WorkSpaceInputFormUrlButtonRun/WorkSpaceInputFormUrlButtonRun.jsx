import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import useProjectContext from "../../../../../../Hooks/FileManager/useProjectContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import useFileManagerContext from "../../../../../../Hooks/FileManager/useFileMangerContext";
import "./WorkSpaceInputFormUrlButtonRun.css";
import { fetch } from "@tauri-apps/plugin-http";
import { Play } from "lucide-react";
import { useFilemanagerStore } from "../../../../../../stores/FileManagerStore";

export default function WorkSpaceInputFormUrlButtonRun() {
  const [content] = useWorkSpaceContentContext();
  const [filesState] = useFilesContext();
  const [, dispatchFileManagerState] = useFileManagerContext();
  const { id } = useProjectContext();
  const toggleIsRuning = useFilemanagerStore((store) => store.toggleIsRuning);
  const fileManagerState = useFilemanagerStore((store) => store.vfs);

  const handleRun = async () => {
    if (!content.url.parseUrl) return;
    if (content.isRuning) return;

    const node = fileManagerState.getNodeById(filesState.currentFile);

    toggleIsRuning(node);

    const newResponse = [...content.responses];
    let parsedResponse;
    let timeTaken;
    let response;
    const start = performance.now();
    try {
      const headersToSend = {};

      content.headers.forEach((header) => {
        if (header.isActive) {
          if (header.key === "Host") {
            try {
              const url = new URL(content.url.parseUrl);
              headersToSend[header.key] = url.host;
            } catch {
              headersToSend[header.key] = "";
            }
          } else {
            headersToSend[header.key] = header.value;
          }
        }
      });

      if (content.type === "GET" || !content?.body?.bodyContent) {
        response = await fetch(content.url.parseUrl, {
          method: content.type,
          headers: headersToSend,
        });
      } else {
        response = await fetch(content.url.parseUrl, {
          method: content.type,
          headers: headersToSend,
          body: content?.body?.bodyContent || "",
        });
      }

      toggleIsRuning(node);

      const end = performance.now();
      timeTaken = Math.abs(start - end);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        parsedResponse = await response.json();
      } else {
        parsedResponse = await response.text();
      }
    } catch (error) {
      console.log(error);
      timeTaken = Math.abs(start - performance.now());
      parsedResponse = error.message;
    }
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
      status: response?.status || 0,
      response: parsedResponse,
      headers:
        response === undefined
          ? {}
          : Object.fromEntries(response.headers.entries()),
      url: content.url.parseUrl,
      queryParams: content.url.queryParams,
      isPinned: false,
      inputUrl: content.url.inputUrl,
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
  };

  return (
    <button
      className="workspace-input-form_run-button "
      onClick={handleRun}
      disabled={content.isRuning}
      style={{
        background: content.isRuning ? "var(--primary-transparent)" : "",
        cursor: content.isRuning ? "not-allowed" : "",
        color: content.isRuning ? "var(--muted-foreground)" : "",
      }}
    >
      <Play size={16} />
      Send
    </button>
  );
}
