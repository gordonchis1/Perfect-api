import { Plus } from "lucide-react";
import Input from "../../../../../Input/Input";
import "./DirectoryVariables.css";
import useDirSettingsContext from "../../../../../../../Hooks/useDirSettingsContext";
import { DEFAULT_DIR_CONFIG } from "../../../../../../../utils/constants/DefaultDirConfig";
import { useProjectStore } from "../../../../../../../stores/ProjectStore";
import { nanoid } from "nanoid";

export default function DirectoryVariables() {
  const node = useDirSettingsContext();
  const variables = node?.dirConfig?.variables || DEFAULT_DIR_CONFIG.variables;
  const dirUpdateSettings = useProjectStore((store) => store.updateDirSettings);
  useProjectStore((state) => state.version);

  const handleAdd = () => {
    dirUpdateSettings(node.id, {
      ...node.dirConfig,
      variables: [...variables, { key: "", value: "", id: nanoid() }],
    });
  };

  const handleDelete = (id) => {
    const updateVariable = variables.filter((variable) => variable.id != id);
    dirUpdateSettings(node.id, {
      ...node.dirConfig,
      variables: updateVariable,
    });
  };

  const handleUpdateKey = (event, id) => {
    const value = event.target.value;
    const variableIdx = variables.findIndex((variable) => variable.id == id);
    const updatedVariables = [...variables];
    updatedVariables[variableIdx] = {
      ...updatedVariables[variableIdx],
      key: value,
    };

    dirUpdateSettings(node.id, {
      ...node.dirConfig,
      variables: updatedVariables,
    });
  };
  const handleUpdateValue = (event, id) => {
    const value = event.target.value;
    const variableIdx = variables.findIndex((variable) => variable.id == id);
    const updatedVariables = [...variables];
    updatedVariables[variableIdx] = {
      ...updatedVariables[variableIdx],
      value,
    };

    dirUpdateSettings(node.id, {
      ...node.dirConfig,
      variables: updatedVariables,
    });
  };

  return (
    <div className="directory-variables_container">
      {variables.map((variable) => {
        return (
          <div className="directory-variable" key={variable.id}>
            <Input
              placeholder={"Key"}
              value={variable.key}
              onChange={(event) => handleUpdateKey(event, variable.id)}
            />
            <Input
              placeholder={"Value"}
              value={variable.value}
              onChange={(event) => handleUpdateValue(event, variable.id)}
            />
            <button onClick={() => handleDelete(variable.id)}>delete</button>
          </div>
        );
      })}
      <button className="directory-variable_add-btn" onClick={handleAdd}>
        <Plus size={20} />
      </button>
    </div>
  );
}
