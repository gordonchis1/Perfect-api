import { appDataDir, documentDir, join } from "@tauri-apps/api/path";
import { exists, mkdir, writeTextFile } from "@tauri-apps/plugin-fs";
import { getConfig } from "./userConfiguration/getConfig";
import { useUserConfigStore } from "../stores/UserConfigStore";

async function createDocumentDir() {
  const documentPath = await documentDir();
  const path = await join(documentPath, "perfect api");
  const existDir = await exists(path);
  const config = useUserConfigStore.getState().config;
  const updateConfig = useUserConfigStore.getState().updateConfig;

  // Check if the directory already exists

  try {
    if (!existDir) {
      await mkdir(path, { recursive: true });
    }

    if (!config?.general?.paths?.perfectApiPath) {
      const newConfig = {
        ...config,
        general: {
          ...config.general,
          paths: {
            ...config.general.paths,
            perfectApiPath: path,
          },
        },
      };

      await updateConfig(newConfig);
    }
  } catch (error) {
    console.error("Error creating directory:", error);
  }
}

async function createProjectsFile() {
  const appDataPath = await appDataDir();
  const config = useUserConfigStore.getState().config;
  const path = await join(appDataPath, "projects.json");
  const existFile = await exists(path);
  const updateConfig = useUserConfigStore.getState().updateConfig;

  const newConfig = {
    ...config,
    general: {
      ...config.general,
      paths: {
        ...config.general.paths,
        projectFilePath: path,
      },
    },
  };

  await updateConfig(newConfig);

  try {
    // Check if the file already exists
    if (existFile) return;

    await writeTextFile(path, JSON.stringify([]));
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

export async function initDocumentDir() {
  const initConfig = useUserConfigStore.getState().initConfig;

  await initConfig();
  await createDocumentDir();
  await createProjectsFile();
  console.log("Document directory and projects file initialized.");
}

export async function getStorageDir() {
  try {
    const config = await getConfig();
    const { paths } = await config.get("general");

    return paths.perfectApiPath;
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectsFile() {
  try {
    const config = await getConfig();
    const { paths } = await config.get("general");
    const existFile = await exists(paths.projectFilePath);

    // Check if the file exists
    if (!existFile) {
      console.error("Projects file does not exist.");
      return null;
    }

    return paths.projectFilePath;
  } catch (error) {
    console.error(error);
  }
}
