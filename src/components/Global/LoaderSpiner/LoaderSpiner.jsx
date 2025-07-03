import "./LoaderSpiner.css";

export default function LoaderSpiner({ size }) {
  return (
    <div
      className="loader-spiner_container"
      style={{ width: size, height: size }}
    >
      <div className="loader-spiner"></div>
    </div>
  );
}
