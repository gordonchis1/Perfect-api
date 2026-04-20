import { useProjectStore } from "../../../../../../../stores/ProjectStore";
import { AUTH_TYPES } from "../../../../../../../utils/constants/AUTH_TYPES.JS";
import Selector from "../../../../../../Global/Selector/Selector";

export default function AuthSelector() {
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile,
  );

  const handleChangeAuthType = (authType) => {
    updateContentOfOpenFile(currentFileId, {
      ...content,
      auth: {
        type: authType,
        data: AUTH_TYPES[authType].defaultData || null,
      },
    });
  };

  return (
    <Selector
      value={content?.auth?.type || "none"}
      onChange={handleChangeAuthType}
    >
      <Selector.Trigger
        label={AUTH_TYPES[content?.auth?.type]?.label || "No Auth"}
      ></Selector.Trigger>
      <Selector.Options>
        {Object.keys(AUTH_TYPES).map((key) => (
          <Selector.Option
            key={key}
            value={key}
            label={AUTH_TYPES[key].label}
          />
        ))}
      </Selector.Options>
    </Selector>
  );
}
