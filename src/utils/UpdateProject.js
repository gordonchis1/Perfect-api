import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { getProjectPathById } from "./getProjects";

export default async function UpdateProject(newContent, id) {
  if (!id) throw new Error("Invalid Id");

  try {
    const path = await getProjectPathById(id);
    const originalFile = await readTextFile(path);
    const originalParseFile = await JSON.parse(originalFile);

    const updatedFile = originalParseFile;
    updatedFile.content = JSON.parse(JSON.stringify(newContent));

    await writeTextFile(path, JSON.stringify(updatedFile));
    console.log(`Project ${id} updated successfully`);
  } catch (error) {
    console.log(error);
    throw new Error("Error update project file");
  }
}
