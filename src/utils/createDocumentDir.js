import { documentDir, homeDir, join } from "@tauri-apps/api/path";
import { exists, mkdir, writeTextFile } from "@tauri-apps/plugin-fs";

// ! Refact function
async function createDocumentDir() {
  try {
    const documentPath = await documentDir();
    const path = await join(documentPath, "perfect api");
    const existDir = await exists(path);

    // Check if the directory already exists
    if (existDir) return;
    try {
      await mkdir(path, { recursive: true });
      window.localstorage.setitem("documentdir", path);
    } catch (error) {
      console.error("error creating directory:", error);
    }
  } catch (error) {
    const userHomeDirPath = await homeDir()
    const path = await join(userHomeDirPath, "perfect api");
    const existDir = await exists(path)

    if (existDir) return;

    try {
      await mkdir(path, { recursive: true });
      window.localstorage.setitem("documentdir", path);
    } catch (error) {
      console.error("error creating directory:", error);
    }

  }



}

async function createProjectsFile() {
  const documentPath = await documentDir();
  const path = await join(documentPath, "perfect api", "projects.json");
  const existFile = await exists(path);

  // Check if the file already exists
  if (existFile) return;

  try {
    await writeTextFile(path, JSON.stringify([]));
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

export async function initDocumentDir() {
  await createDocumentDir();
  await createProjectsFile();
  console.log("Document directory and projects file initialized.");
}

export function getStorageDir() {
  const documentDir = window.localStorage.getItem("documentDir");
  return documentDir;
}

export async function getProjectsFile() {
  const path = await join(getStorageDir(), "projects.json");
  const existFile = await exists(path);

  // Check if the file exists
  if (!existFile) {
    console.error("Projects file does not exist.");
    return null;
  }

  return path;
}
