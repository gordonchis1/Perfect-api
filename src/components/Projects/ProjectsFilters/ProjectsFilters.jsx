import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectsFiltersButton from "./ProjectsFiltersButton";

export default function ProjectsFilters({ setFilters, filters }) {
  return (
    <div className="projects-filters-container">
      <div className="projects-filters_input-container">
        <FontAwesomeIcon icon={faSearch} className="projects-input_icon" />
        <input
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value.toLowerCase(),
            }))
          }
          type="text"
          placeholder="Buscar un proyecto"
          className="projects-input_input"
        />
      </div>
      <div className="projects-filters_buttons-container">
        <ProjectsFiltersButton
          isSelected={filters.all}
          text={"Todos"}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              favorites: false,
              recent: false,
              all: true,
            }))
          }
        />
        <ProjectsFiltersButton
          isSelected={filters.recent}
          text={"Recientes"}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              favorites: false,
              all: false,
              recent: true,
            }))
          }
        />
        <ProjectsFiltersButton
          isSelected={filters.favorites}
          text={"Favoritos"}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              all: false,
              recent: false,
              favorites: true,
            }))
          }
        />
      </div>
    </div>
  );
}
