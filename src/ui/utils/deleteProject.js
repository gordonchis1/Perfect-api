import { getProjectsFile } from "./createDocumentDir";

export const deleteProject = async (id) => {
    if (!id) throw new Error("invalid project id");
    const filePath = await getProjectsFile();

    try {
        const fileContent = await window.fs.readTextFile(filePath);
        const fileContentParse = JSON.parse(fileContent);

        const deletedIndex = fileContentParse.findIndex(
            (project) => project.id === id
        );
        const projectFilePath = fileContentParse[deletedIndex].path;

        await window.fs.remove(projectFilePath);

        fileContentParse.splice(deletedIndex, 1);

        await window.fs.writeTextFile(filePath, JSON.stringify(fileContentParse));
    } catch (error) {
        throw new Error(error);
    }
};
