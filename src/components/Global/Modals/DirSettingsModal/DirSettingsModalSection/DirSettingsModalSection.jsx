import { Settings2 } from "lucide-react";
import "./DirSettingsModalSection.css";
import Selector from "../../../Selector/Selector";
import { workspaceTypeInput } from "../../../../../utils/constants/WorkspaceInputConstants";
import useDirSettingsContext from "../../../../../Hooks/useDirSettingsContext";
import { useProjectStore } from "../../../../../stores/ProjectStore";

export default function DirSettingsModalSection() {
  const node = useDirSettingsContext();
  const dirUpdateSettings = useProjectStore((store) => store.updateDirSettings);
  useProjectStore((store) => store.version);

  return (
    <div className="dir-settings-modal_section-container">
      <span className="section_title">
        <h3>Preferences</h3>
        <Settings2 size={23} />
      </span>
      <div className="options_container">
        <div className="option_container">
          <div className="option_text-container">
            <span className="option_title">Default Requests Method</span>
            <span className="option_description">
              Default Request Method for New Files
            </span>
          </div>
          <Selector
            onChange={(value) => {
              dirUpdateSettings(node.id, { ...node.dirConfig, type: value });
            }}
            value={node?.dirConfig?.type || "GET"}
          >
            <Selector.Trigger
              label={node?.dirConfig?.type || "GET"}
              value={node?.dirConfig?.type || "GET"}
              style={{
                color: workspaceTypeInput.find(
                  (key) => key.type == node?.dirConfig?.type,
                ).color,
                background: workspaceTypeInput.find(
                  (key) => key.type == node?.dirConfig?.type,
                ).bg,
                borderRadius: "4px",
              }}
            ></Selector.Trigger>
            <Selector.Options>
              {workspaceTypeInput.map((key, idx) => {
                return (
                  <Selector.Option
                    style={{
                      color: key.bg,
                    }}
                    key={key.type}
                    value={key.type}
                    label={key.type}
                  />
                );
              })}
            </Selector.Options>
          </Selector>
        </div>
      </div>
    </div>
  );
}
