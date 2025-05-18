import { useEffect, useRef } from "react";
import useFileManagerContext from "./useFileMangerContext";
import useProjectContext from "./useProjectContext";
import useFilesContext from "../useFilesContext";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { updateProjectContentAndState } from "../../utils/UpdateProject";

export default function useSaveStateOnClose() {
  const [files] = useFilesContext();
  const [content] = useFileManagerContext();
  const { id } = useProjectContext();

  const idRef = useRef(id);
  const filesRef = useRef(files);
  const contentRef = useRef(content);

  useEffect(() => {
    idRef.current = id;
    filesRef.current = files;
    contentRef.current = content;
  }, [id, files, content]);

  useEffect(() => {
    let unlisten;

    const setup = async () => {
      const currentWindow = getCurrentWindow();
      unlisten = await currentWindow.listen(
        "tauri://close-requested",
        async () => {
          await updateProjectContentAndState(
            filesRef.current,
            contentRef.current,
            idRef.current
          );
          currentWindow.destroy();
        }
      );
    };

    if (!unlisten) {
      setup();
    }

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);
}
