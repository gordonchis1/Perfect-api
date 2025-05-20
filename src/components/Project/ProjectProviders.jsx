import ProjectProvider from "../../providers/Project/ProjectProvider";
import FileManagerProvider from "../../providers/FileManager/FileManagerProvider";
import FilesProvider from "../../providers/FilesProvider/FilesProvider";

export default function ProjectProviders({ children }) {
  return (
    <ProjectProvider>
      <FileManagerProvider>
        <FilesProvider>{children}</FilesProvider>
      </FileManagerProvider>
    </ProjectProvider>
  );
}
