import { getProjectsFile, getStorageDir } from "./createDocumentDir";

export const renameProject = async (id, newName) => {
    if (!id) throw new Error("invalid project id");

    const filePath = await getProjectsFile();
    const projectsDirPath = await getStorageDir();

    try {
        const newPath = await window.path.join(projectsDirPath, newName + ".json");
        const fileContent = await window.fs.readTextFile(filePath);
        const fileContentParse = JSON.parse(fileContent);

        const renameIndex = fileContentParse.findIndex(
            (project) => project.id === id
        );

        const isValidName = fileContentParse.some(
            (project) => project.name === newName
        );

        if (isValidName) {
            throw new Error("Ya existe un proyecto con el mismo nombre");
        }

        const oldPath = fileContentParse[renameIndex].path;

        fileContentParse[renameIndex].name = newName;
        fileContentParse[renameIndex].path = newPath;

        await window.fs.rename(oldPath, newPath);
        await window.fs.writeTextFile(filePath, JSON.stringify(fileContentParse));

        return fileContentParse[renameIndex];
    } catch (error) {
        throw new Error(error);
    }
};
