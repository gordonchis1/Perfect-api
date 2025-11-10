import "./PreviewGalleryVideo.css";

export default function PreviewGalleryVideo({ url, vidRef, onClick }) {
  return (
    <video
      autoPlay={true}
      onClick={onClick}
      className="gallery_video"
      loop={true}
      ref={vidRef}
      muted={true}
      src={url}
    ></video>
  );
}
