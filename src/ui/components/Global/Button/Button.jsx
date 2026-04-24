import "./Button.css"

export default function Button({ text,
    onClick, className,
    icon = null,
    background = "var(--primary)",
    color = "var(--primary-text-color)",
    ...props }) {

    return <button
        onClick={onClick}
        className={`global-button ${className}`}
        style={{ background, color }
        } {...props}>
        {text}{icon}
    </button>
}
