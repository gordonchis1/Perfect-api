import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { getProjectsFile } from "./createDocumentDir";

export async function updateProjectsFile(updatedIdProject, newValue) {
  const path = await getProjectsFile();

  try {
    const fileContent = await readTextFile(path);
    const projects = JSON.parse(fileContent);

    const selectProject = projects.findIndex((project) => {
      return project.id === updatedIdProject;
    });

    projects[selectProject] = newValue;
    console.log(projects[selectProject]);

    await writeTextFile(path, JSON.stringify(projects));
  } catch (error) {
    console.error(error);
  }
}
