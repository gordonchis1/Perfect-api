import { documentDir, join } from "@tauri-apps/api/path";
import { exists, mkdir, writeTextFile } from "@tauri-apps/plugin-fs";

async function createDocumentDir() {
  const documentPath = await documentDir();
  const path = await join(documentPath, "perfect api");
  const existDir = await exists(path);

  // Check if the directory already exists
  if (existDir) return;

  try {
    await mkdir(path, { recursive: true });
    window.localStorage.setItem("documentDir", path);
  } catch (error) {
    console.error("Error creating directory:", error);
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
