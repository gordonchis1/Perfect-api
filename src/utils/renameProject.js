import { getProjectsFile } from "./createDocumentDir";

export const renameProject = async (id) => {
  if (!id) throw new Error("invalid project id");

  const filePath = await getProjectsFile();
  console.log(filePath);
};
