import { useProjectStore } from "../../../../../../../stores/ProjectStore";
import Selector from "../../../../../Selector/Selector";
import useDirSettingsContext from "../../../../../../../Hooks/useDirSettingsContext";
import { workspaceTypeInput } from "../../../../../../../utils/constants/WorkspaceInputConstants";

export default function DefaultType() {
  const dirUpdateSettings = useProjectStore((store) => store.updateDirSettings);
  const node = useDirSettingsContext();
  useProjectStore((store) => store.version);

  return (
    <Selector
      className="default-type_selector"
      onChange={(value) => {
        dirUpdateSettings(node.id, { ...node.dirConfig, type: value }, true);
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
        {workspaceTypeInput.map((key) => {
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
  );
}
