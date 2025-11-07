import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { getProjectPathById } from "./getProjects";
import { updateLastUpdateDate } from "./updateProjectsFile";

export async function UpdateProjectContent(newContent, id) {
  if (!id) throw new Error("Invalid Id");
  try {
    const path = await getProjectPathById(id);
    const originalFile = await readTextFile(path);
    const originalParseFile = await JSON.parse(originalFile);

    const updatedFile = originalParseFile;
    updatedFile.content = newContent.toJSON();

    await writeTextFile(path, JSON.stringify(updatedFile));
    await updateLastUpdateDate(id);
    console.log(`Project ${id} updated successfully`);
  } catch (error) {
    console.log(error);
    throw new Error("Error update project content");
  }
}

export async function UpdateProjectState(newState, id) {
  if (!id) throw new Error("Invalid id");

  try {
    const path = await getProjectPathById(id);
    const originalFile = await readTextFile(path);
    const originalParseFile = await JSON.parse(originalFile);

    const updatedFile = originalParseFile;

    if (!updatedFile.state) {
      originalParseFile.state = { openFiles: [], currentFile: "" };
    }

    updatedFile.state.currentFile = newState.currentFile;

    if (newState.openFiles.length !== 0) {
      updatedFile.state.openFiles = [];
      newState.openFiles.forEach((file) => {
        updatedFile.state.openFiles.push(file.id);
      });
    } else {
      updatedFile.state.openFiles = [];
    }

    await writeTextFile(path, JSON.stringify(updatedFile));
  } catch (error) {
    console.error(error);
    throw new Error("Error update project state");
  }
}

export async function updateProjectContentAndState(newState, newContent, id) {
  if (!id) throw new Error("Invalid id");

  try {
    const path = await getProjectPathById(id);
    const originalFile = await readTextFile(path);
    const originalParseFile = await JSON.parse(originalFile);

    const updatedFile = originalParseFile;
    updatedFile.content = newContent.toJSON();

    if (!updatedFile.state) {
      originalParseFile.state = { openFiles: [], currentFile: "" };
    }

    updatedFile.state.currentFile = newState.currentFile;

    updatedFile.state.openFiles = newState.openFiles;

    await writeTextFile(path, JSON.stringify(updatedFile));
  } catch (error) {
    console.error(error);
    throw new Error("Error update project state");
  }
}
