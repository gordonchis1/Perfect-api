import { useProjectsStore } from "../../../../stores/ProjectsStore";
import { Star } from "lucide-react";

export default function AddToFavoriteButton({ project }) {
  const addToFavorite = useProjectsStore((state) => state.addProjectToFavorite);

  const handleAddToFavorite = async () => {
    addToFavorite(project.id);
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
