import { useState, useEffect } from "react";

export default function useFilterProjects(projects, filters) {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (filters.search !== "") {
      const filteredProjects = projects.filter((project) => {
        return project.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());
      });
      setFilteredProjects(filteredProjects);
    } else {
      setFilteredProjects(projects);
    }

    if (filters.favorites) {
      const filteredProjects = projects.filter((project) => {
        return project.isFavorite === true;
      });
      setFilteredProjects(filteredProjects);
    } else if (filters.recent) {
      const now = new Date();
      const filteredProjects = projects.filter((project) => {
        const lastUpdate = new Date(project.lastUpdate);
        const diffTime = Math.abs(now - lastUpdate) / 1000 / 60;
        return diffTime < 2880;
      });

      setFilteredProjects(filteredProjects);
    }
  }, [filters, projects]);

  return [filteredProjects, setFilteredProjects];
}
