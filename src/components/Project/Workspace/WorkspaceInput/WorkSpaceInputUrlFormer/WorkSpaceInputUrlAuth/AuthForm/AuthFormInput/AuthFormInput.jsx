import { useState } from "react";
import Input from "../../../../../../../Global/Input/Input";
import { Eye, EyeClosed } from "lucide-react";

export default function AuthFormInput({ field, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth_form-filed-input-container">
      <span>{field.label}</span>
      <Input
        type={field.type === "password" && !showPassword ? "password" : "text"}
        placeholder={field?.placeholder}
        style={{ maxWidht: "92%" }}
        value={value}
        onChange={onChange}
      />
      <div className="form-field_button-container">
        {field.type === "password" && (
          <button
            className="form-filed-input_eye-button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? <Eye size={30} /> : <EyeClosed size={30} />}
          </button>
        )}
      </div>
    </div>
  );
}
