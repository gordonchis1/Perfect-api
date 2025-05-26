import "./IsRuningIndicator.css";

const stateColor = {
  true: "var(--success)",
  false: "var(--inactive)",
  error: "var(--error)",
  success: "var(--success)",
};

export default function IsRuningIndicator({ isRuning, size = "14px" }) {
  return (
    <div
      className="is-running-indicator"
      style={{
        background: isRuning ? stateColor.true : stateColor.false,
        width: size,
        height: size,
      }}
    ></div>
  );
}
