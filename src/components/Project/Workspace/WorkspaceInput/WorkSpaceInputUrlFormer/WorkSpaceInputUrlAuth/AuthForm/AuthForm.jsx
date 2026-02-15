import "./AuthForm.css";

export default function AuthForm({ fields }) {
  console.log(fields);
  return fields.map((field) => {
    switch (field.type) {
      case "text":
      case "password":
        return (
          <div className="auth_form-filed-input-container">
            <p>{field.label}</p>
            <input type={field.type} placeholder={field?.placeholder} />{" "}
          </div>
        );
    }
  });
}
