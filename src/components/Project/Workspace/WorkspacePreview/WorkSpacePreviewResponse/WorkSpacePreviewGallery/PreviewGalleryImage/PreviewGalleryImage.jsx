import "./PreviewGalleryImage.css";

export default function PreviewGalleryImage({ url, imgRef }) {
  return <img src={url} className="gallery-container_img" ref={imgRef}></img>;
}
