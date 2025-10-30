import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { getProjectsFile, getStorageDir } from "./createDocumentDir";
import { join } from "@tauri-apps/api/path";
import { nanoid } from "nanoid";
import { VirtualFileSystem } from "./ProjectFileObject";

// Function to create a new project in the projects.json file
export async function createNewProjectInProjectsFile(newProject) {
  const projectsFile = await getProjectsFile();

  if (!projectsFile) {
    console.error("Projects file not found.");
    return;
  }

  try {
    const projectsData = await readTextFile(projectsFile);
    const projects = JSON.parse(projectsData);

    projects.push(newProject);
    await writeTextFile(projectsFile, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error("Error reading projects file:", error);
  }
}

// Function to create a new project file
// return the path of the new project file
export async function createNewProjectFile(newProject) {
  const path = await getStorageDir();
  const projectPath = await join(path, newProject.name + ".json");

  try {
    const projectTemplate = {
      id: newProject.id,
      name: newProject.name,
      content: new VirtualFileSystem().toJSON(),
      state: {
        openFiles: [],
        currentFile: "",
      },
    };

    await writeTextFile(projectPath, JSON.stringify(projectTemplate));
    return projectPath;
  } catch (error) {
    console.error("Error creating project file:", error);
  }
}

async function theProjectAlredyExists(projectName) {
  const projectsFile = await getProjectsFile();

  if (!projectsFile) {
    console.error("Projects file not found.");
    return;
  }

  try {
    const projectsData = await readTextFile(projectsFile);
    const projects = JSON.parse(projectsData);

    const projectExists = projects.some(
      (project) => project.name === projectName
    );
    return projectExists;
  } catch (error) {
    console.error("Error reading projects file:", error);
  }
}

// Function to create a new project
export async function createNewProject(newProjectName) {
  const newProject = {
    id: nanoid(),
    name: newProjectName,
    createDate: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    isFavorite: false,
    numberOfRequests: 0,
  };

  // Check if the project already exists
  const projectExists = await theProjectAlredyExists(newProject.name);
  if (projectExists) {
    throw new Error("Project already exists.");
  }

  // Create the project file and add it to the projects.json file
  const path = await createNewProjectFile(newProject);
  if (path) {
    newProject.path = path;
    await createNewProjectInProjectsFile(newProject);
    console.log("New project created:", newProject);
    return newProject;
  } else {
    console.error("Error creating new project.");
  }
}
