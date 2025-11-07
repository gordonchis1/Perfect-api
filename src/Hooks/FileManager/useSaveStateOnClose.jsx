import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useProjectStore } from "../../stores/ProjectStore";

export default function useSaveStateOnClose() {
  const resetProjectStore = useProjectStore((state) => state.reset);

  useEffect(() => {
    let unlisten;

    const setup = async () => {
      const currentWindow = getCurrentWindow();
      unlisten = await currentWindow.listen(
        "tauri://close-requested",
        async () => {
          await resetProjectStore();

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
