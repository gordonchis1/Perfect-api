import "./GalleryInfoProp.css";

export default function GalleryInfoProp({ propKey, propValue }) {
  return (
    <div className="view-info_prop-container">
      <span>{propKey}:</span> <span>{propValue}</span>
    </div>
  );
}
