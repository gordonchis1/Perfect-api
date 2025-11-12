import "./GalleryViewOption.css";

export default function GalleryViewOption({ icon, onClick }) {
  return (
    <button className="view-options_option" onClick={onClick}>
      {icon}
    </button>
  );
}
