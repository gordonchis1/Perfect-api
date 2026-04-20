import { getProjectById } from "./getProjects";


export default async function ChooseFolderAndExportProject(id) {
    const project = await getProjectById(id);

    try {
        const savePath = await window.dialog.openDialog({
            title: "Exportar",
            defaultPath: `${project.name}.json`,
            filters: [
                {
                    name: "JSON",
                    extensions: ["json"],
                },
            ],
        });

        await window.fs.writeTextFile(savePath, JSON.stringify(project));
    } catch (error) {
        console.error(error);
    }
}
