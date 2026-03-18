import { Cuboid, Settings2 } from "lucide-react";
import DefaultType from "../../components/Global/Modals/DirSettingsModal/DirSettingsModalSection/DirSettingsOptions/DefaultType/DefaultType";
import DirectoryVariables from "../../components/Global/Modals/DirSettingsModal/DirSettingsModalSection/DirSettingsOptions/DirectoryVariables/DirectoryVariables";

export const DirSettings = {
  preferences: {
    title: "Prefrences",
    icon: Settings2,
    options: [
      {
        component: DefaultType,
        title: "Default Requests Method",
        description: "Default Request Method for New Files",
      },
    ],
  },
  variables: {
    title: "Variables",
    icon: Cuboid,
    options: [
      {
        title: "Directory Variables",
        description:
          "Define variables that are available within the current directory and its subdirectories.",
        component: DirectoryVariables,
      },
    ],
  },
};
