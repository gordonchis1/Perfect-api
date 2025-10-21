import { appDataDir, documentDir, join } from "@tauri-apps/api/path";
import { exists, mkdir, writeTextFile } from "@tauri-apps/plugin-fs";
import { getConfig } from "./userConfiguration/getConfig";
import { initUserConfig } from "./userConfiguration/initUserConfguration";

async function createDocumentDir() {
  const documentPath = await documentDir();
  const path = await join(documentPath, "perfect api");
  const existDir = await exists(path);
  const config = await getConfig();
  const general = await config.get("general");

  // Check if the directory already exists

  try {
    if (!existDir) {
      await mkdir(path, { recursive: true });
    }

    if (!general?.paths?.perfectApiPath) {
      // ? Store document path in user config
      await config.set("general", {
        ...general,
        paths: { perfectApiPath: path },
      });
      await config.save();
    }
  } catch (error) {
    console.error("Error creating directory:", error);
  }
}

async function createProjectsFile() {
  const config = await getConfig();
  const configGeneral = await config.get("general");
  const appDataPath = await appDataDir();
  const path = await join(appDataPath, "projects.json");
  const existFile = await exists(path);

  await config.set("general", {
    ...configGeneral,
    paths: { ...configGeneral.paths, projectFilePath: path },
  });
  await config.save();

  try {
    // Check if the file already exists
    if (existFile) return;

    await writeTextFile(path, JSON.stringify([]));
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

export async function initDocumentDir() {
  await initUserConfig();
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
