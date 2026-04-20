import "./GalleryViewControl.css";

export default function GalleryViewControl({
  icon,
  onClick,
  type,
  mediaArr,
  idx,
}) {
  const determineColor = () => {
    const style = {
      color: "var(--primary-text-color)",
      cursor: "pointer",
    };

    if (type === "next" && mediaArr.length - 1 == idx) {
      style.color = "var(--muted-foreground)";
      style.cursor = "not-allowed";
    } else if (type === "prev" && idx == 0) {
      style.color = "var(--muted-foreground)";
      style.cursor = "not-allowed";
    }

    return style;
  };

  return (
    <div className="gallery-view_control-container">
      <button
        onClick={onClick}
        style={determineColor()}
        className={`gallery-view_control-btn gallery-view_control-btn-${type}`}
      >
        {icon}
      </button>
    </div>
  );
}
