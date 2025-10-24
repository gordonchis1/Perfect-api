import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { updateProjectsFile } from "../../../../utils/updateProjectsFile";

export default function AddToFavoriteButton({ project, setProjects }) {
  const [hover, setHover] = useState(false);

  const handleAddToFavorite = async () => {
    console.log(project);
    setProjects((prevProjects) =>
      prevProjects.map((prevProject) => {
        if (prevProject.id === project.id) {
          return {
            ...prevProject,
            isFavorite: !project.isFavorite,
          };
        }
        return prevProject;
      })
    );

    await updateProjectsFile(project.id, {
      ...project,
      isFavorite: !project.isFavorite,
    });
  };

  return (
    <button
      onClick={handleAddToFavorite}
      className="project-card-button-add-favorite"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FontAwesomeIcon
        icon={hover || project.isFavorite ? faStarSolid : faStar}
        style={{ color: project.isFavorite ? "var(--warning)" : "" }}
      />
    </button>
  );
}
