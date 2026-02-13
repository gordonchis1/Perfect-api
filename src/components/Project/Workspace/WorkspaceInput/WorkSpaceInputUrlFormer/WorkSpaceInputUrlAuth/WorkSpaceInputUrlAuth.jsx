import AuthSelector from "./AuthSelector/AuthSelector";
import "./WorkSpaceInputUrlAuth.css";

export default function WorkSpaceInputUrlAuth() {
  return (
    <div className="workspace-input_auth-container">
      <h1 className="auth_title">Auth</h1>
      <AuthSelector />
    </div>
  );
}
