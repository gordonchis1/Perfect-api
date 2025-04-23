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

export async function updateLastUpdateDate(id) {
  if (!id) throw new Error("Invalid Id");

  const path = await getProjectsFile();

  try {
    const fileContent = await readTextFile(path);
    const projects = JSON.parse(fileContent);

    const selectProject = projects.findIndex((project) => {
      return project.id === id;
    });

    projects[selectProject].lastUpdate = new Date().toISOString();

    await updateProjectsFile(id, projects[selectProject]);
  } catch (error) {
    console.error(error);
    throw new Error("Error update last update date");
  }
}
