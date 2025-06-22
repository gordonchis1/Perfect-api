import { join } from "@tauri-apps/api/path";
import { getProjectsFile, getStorageDir } from "./createDocumentDir";
import { readTextFile, rename, writeTextFile } from "@tauri-apps/plugin-fs";

export const renameProject = async (id, newName) => {
  if (!id) throw new Error("invalid project id");

  const filePath = await getProjectsFile();
  const projectsDirPath = getStorageDir();

  try {
    const newPath = await join(projectsDirPath, newName + ".json");
    const fileContent = await readTextFile(filePath);
    const fileContentParse = JSON.parse(fileContent);

    const renameIndex = fileContentParse.findIndex(
      (project) => project.id === id
    );

    const isValidName = fileContentParse.some(
      (project) => project.name === newName
    );

    if (isValidName) {
      throw new Error("Ya existe un proyecto con el mismo nombre");
    }

    const oldPath = fileContentParse[renameIndex].path;
    fileContentParse[renameIndex].name = newName;
    fileContentParse[renameIndex].path = newPath;

    await rename(oldPath, newPath);
    await writeTextFile(filePath, JSON.stringify(fileContentParse));

    return fileContentParse[renameIndex];
  } catch (error) {
    throw new Error(error);
  }
};
