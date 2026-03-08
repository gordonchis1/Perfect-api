import useDirSettingsContext from "../../../../../Hooks/useDirSettingsContext";
import "./DirSettingsModalHeader.css";

export default function DirSettingsModalHeader() {
  const node = useDirSettingsContext();

  return (
    <div className="dir-settings-modal_header">
      <h1>{node?.name}</h1>
      <h2>Directory Configuration</h2>
    </div>
  );
}
