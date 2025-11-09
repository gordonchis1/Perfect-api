import "./PreviewGalleryVideo.css";

export default function PreviewGalleryVideo({ url, vidRef }) {
  return (
    <video autoPlay={true} className="gallery_video" loop={true} ref={vidRef}>
      <source src={url} type="video/mp4" />
    </video>
  );
}
