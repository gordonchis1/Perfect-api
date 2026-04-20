import "./Input.css";

export default function Input({
  placeholder,
  type,
  value,
  onChange,
  className,
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`global-input ${className}`}
      {...props}
    />
  );
}
