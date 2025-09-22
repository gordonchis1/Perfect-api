import { documentDir, join } from "@tauri-apps/api/path";
import { exists, mkdir, writeTextFile } from "@tauri-apps/plugin-fs";
import { getConfig } from "./userConfiguration/getConfig";
import { initUserConfig } from "./userConfiguration/initUserConfguration";

async function createDocumentDir() {
  const documentPath = await documentDir();
  const path = await join(documentPath, "perfect api");
  const existDir = await exists(path);

  // Check if the directory already exists
  if (existDir) return;

  try {
    const config = await getConfig();
    await mkdir(path, { recursive: true });

    // ? Store document path in user config
    await config.set("paths", { perfectApiPath: path });
    await config.save();
  } catch (error) {
    console.error("Error creating directory:", error);
  }
}

async function createProjectsFile() {
  const config = await getConfig();
  const paths = await config.get("paths");
  const path = await join(paths.perfectApiPath, "projects.json");
  const existFile = await exists(path);

  // Check if the file already exists
  if (existFile) return;

  await config.set("paths", { ...paths, projectFilePath: path });
  await config.save();

  try {
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
    const paths = await config.get("paths");

    return paths.perfectApiPath;
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectsFile() {
  try {
    const config = await getConfig();
    const paths = await config.get("paths");
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
