import { save } from "@tauri-apps/plugin-dialog";
import { getProjectById } from "./getProjects";
import { writeTextFile } from "@tauri-apps/plugin-fs";

export default async function ChooseFolderAndExportProject(id) {
  const project = await getProjectById(id);

  try {
    const savePath = await save({
      title: "Exportar",
      defaultPath: `${project.name}.json`,
      filters: [
        {
          name: "JSON",
          extensions: ["json"],
        },
      ],
    });

    await writeTextFile(savePath, JSON.stringify(project));
  } catch (error) {
    console.error(error);
  }
}
