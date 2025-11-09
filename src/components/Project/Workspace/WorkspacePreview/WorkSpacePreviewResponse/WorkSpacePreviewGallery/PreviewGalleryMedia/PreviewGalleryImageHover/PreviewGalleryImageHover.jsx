import "./PreviewGalleryImageHover.css";

export default function PreviewGalleryImageHover({ img, size }) {
  return (
    <div className="gallery-button_hover-container">
      <p>URL: {img}</p>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
      {size.duration && <p>Duration: {size.duration}</p>}
    </div>
  );
}
