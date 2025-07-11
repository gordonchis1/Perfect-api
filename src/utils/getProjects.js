import { documentDir, join } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/plugin-fs";

export async function getProjects() {
  // TODO: sacar le path de el archivo de la configuracion
  const docDir = await documentDir();
  const path = await join(docDir, "perfect api", "projects.json");
  try {
    const projectsData = await readTextFile(path);
    const projects = JSON.parse(projectsData);

    return projects;
  } catch (error) {
    console.error("Error getting projects", error);
  }
}

export async function getProjectPathById(id) {
  if (!id) throw new Error("Id is not valid");

  try {
    const projects = await getProjects();
    const projectMetaData = projects.find((project) => project.id === id);

    if (projectMetaData === undefined)
      throw new Error(`Project ${id} dont found`);

    return projectMetaData.path;
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectFromProjectsFileById(id) {
  if (!id) throw new Error("Id is not valid");

  try {
    const projects = await getProjects();
    const projectMetaData = projects.find((project) => project.id === id);

    if (projectMetaData === undefined)
      throw new Error(`Project ${id} dont found`);

    return projectMetaData;
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectById(id) {
  if (!id) throw new Error("Id is not valid");

  try {
    const path = await getProjectPathById(id);
    const data = await readTextFile(path);
    const project = await JSON.parse(data);
    return project;
  } catch (error) {
    console.error(error);
  }
}
