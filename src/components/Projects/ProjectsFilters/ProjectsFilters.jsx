import { useProjectsStore } from "../../../stores/ProjectsStore";
import ProjectsFiltersButton from "./ProjectsFiltersButton";
import { Search } from "lucide-react";

export default function ProjectsFilters() {
  const filters = useProjectsStore((state) => state.filters);
  const filterFavorite = useProjectsStore((state) => state.filterFavorite);
  const filterAll = useProjectsStore((state) => state.filterAll);
  const filterRecent = useProjectsStore((state) => state.filterRecent);
  const filterSearch = useProjectsStore((state) => state.filterSearch);

  return (
    <div className="projects-filters-container">
      <div className="projects-filters_input-container">
        <Search size={20} className="projects-input_icon" />
        <input
          onChange={(e) => filterSearch(e.target.value.toLowerCase())}
          type="text"
          placeholder="Buscar un proyecto"
          className="projects-input_input"
        />
      </div>
      <div className="projects-filters_buttons-container">
        <ProjectsFiltersButton
          isSelected={filters.all}
          text={"Todos"}
          onClick={() => filterAll()}
        />
        <ProjectsFiltersButton
          isSelected={filters.recent}
          text={"Recientes"}
          onClick={filterRecent}
        />
        <ProjectsFiltersButton
          isSelected={filters.favorites}
          text={"Favoritos"}
          onClick={() => filterFavorite()}
        />
      </div>
    </div>
  );
}
