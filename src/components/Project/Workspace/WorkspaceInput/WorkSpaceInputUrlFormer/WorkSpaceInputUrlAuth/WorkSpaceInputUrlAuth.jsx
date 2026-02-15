import AuthForm from "./AuthForm/AuthForm";
import AuthSelector from "./AuthSelector/AuthSelector";
import "./WorkSpaceInputUrlAuth.css";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import { AUTH_TYPES } from "../../../../../../utils/constants/AUTH_TYPES.JS";

export default function WorkSpaceInputUrlAuth() {
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );

  return (
    <div className="workspace-input_auth-container">
      <h1 className="auth_title">Auth</h1>
      <AuthSelector />
      <div className="auth_form-container">
        <AuthForm fields={AUTH_TYPES[content?.auth?.type].fields} />
      </div>
    </div>
  );
}
