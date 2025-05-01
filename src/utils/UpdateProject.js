import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { getProjectPathById } from "./getProjects";
import { updateLastUpdateDate } from "./updateProjectsFile";

export default async function UpdateProject(newContent, id) {
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
    throw new Error("Error update project file");
  }
}
