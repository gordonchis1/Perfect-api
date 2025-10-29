import { updateProjectsFile } from "../../../../utils/updateProjectsFile";
import { Star } from "lucide-react";

export default function AddToFavoriteButton({ project, setProjects }) {
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
    >
      <Star
        size={25}
        fill={
          project.isFavorite ? "var(--warning)" : "var(--primary-text-color)"
        }
        stroke={
          project.isFavorite ? "var(--warning)" : "var(--primary-text-color)"
        }
      />
    </button>
  );
}
