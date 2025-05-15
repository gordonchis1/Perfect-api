import { createContext, useEffect, useState } from "react";
import { getProjectFromProjectsFileById } from "../../utils/getProjects";
import { useParams } from "react-router";

export const projectContext = createContext({});

export default function ProjectProvider({ children }) {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = async () => {
      const project = await getProjectFromProjectsFileById(id);
      setProject(project);
    };
    getProject();
  }, [id]);

  return (
    <projectContext.Provider value={project}>
      {children}
    </projectContext.Provider>
  );
}
