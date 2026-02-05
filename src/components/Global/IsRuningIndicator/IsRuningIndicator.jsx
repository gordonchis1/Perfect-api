import "./IsRuningIndicator.css";

const stateColor = {
  true: "var(--success)",
  false: "var(--muted-foreground)",
  error: "var(--error)",
  success: "var(--success)",
};

export default function IsRuningIndicator({ isRunning, size = "14px" }) {
  return (
    <div
      className="is-running-indicator"
      style={{
        background: isRunning ? stateColor.true : stateColor.false,
        width: size,
        height: size,
      }}
    ></div>
  );
}
