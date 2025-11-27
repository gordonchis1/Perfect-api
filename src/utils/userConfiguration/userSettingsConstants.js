import { setTheme } from "@tauri-apps/api/app";
import SettingsOptionCheckbox from "../../components/GlobalSettingsPopUp/SettingsMainContainer/SettingsOption/SettingsOptionCheckbox/SettingsOptionCheckbox";
import SettingsOptionPathSelector from "../../components/GlobalSettingsPopUp/SettingsMainContainer/SettingsOption/SettingsOptionPathSelector/SettingsOptionPathSelector";
import SettingsOptionSelector from "../../components/GlobalSettingsPopUp/SettingsMainContainer/SettingsOption/SettingsOptionSelector/SettingsOptionSelector";
import SettingsOptionVersion from "../../components/GlobalSettingsPopUp/SettingsMainContainer/SettingsOption/SettingsOptionVersion/SettingsOptionVersion";
import { themeConstants } from "./themeConstants";
import SettingsOptionThemeSelector from "../../components/GlobalSettingsPopUp/SettingsMainContainer/SettingsOption/SettingsOptionThemeSelector/SettingsOptionThemeSelector";

export const userSettingsTabs = ["general", "preferences"];

export const userSettingsOptionsMap = {
  perfectApiPath: {
    title: "Ruta de proyectos.",
    description:
      "Selecciona la carpeta donde se guardarán tus proyectos por defecto.",
    type: "path",
    component: SettingsOptionPathSelector,
  },
  projectFilePath: {
    title: "Archivo de índice de proyectos.",
    description:
      "Define la ubicación del archivo que mantiene el registro de todos los proyectos creados.",

    type: "filePath",
    component: SettingsOptionPathSelector,
    alert:
      "Cambiar o eliminar este archivo puede hacer que la aplicación no encuentre tus proyectos hasta que se reconstruya el índice.",
  },
  autoUpdate: {
    title: "Actualización automática",
    description:
      "Permite que la aplicación busque y descargue nuevas versiones de forma automática.",
    type: "checkbox",
    component: SettingsOptionCheckbox,
  },
  version: {
    title: "Version actual: ",
    type: "version",
    component: SettingsOptionVersion,
  },
  theme: {
    title: "Tema",
    description: "Selecciona el tema de color de la aplicación.",
    type: "selector",
    options: [
      "dark",
      "light",
      "ocean",
      "matcha",
      "sunset",
      "lavender",
      "cyberpunk",
      "nord",
      "solarized",
    ],
    component: SettingsOptionThemeSelector,
    onChange: async (opt, newConfig, tab) => {
      await setTheme(themeConstants[opt].theme);
      newConfig[tab]["editor"]["editorTheme"] = themeConstants[opt].monacoTheme;
    },
  },
  editorTheme: {
    title: "Tema del editor",
    description: "Selecciona el tema de color para el editor de código.",
    type: "editor-theme",
    options: [
      "vs-custom-dark",
      "vs-custom-light",
      "vs-ocean",
      "vs-matcha",
      "vs-sunset",
      "vs-lavender",
      "vs-cyberpunk",
      "vs-nord",
      "vs-solarized",
    ],
    component: SettingsOptionSelector,
  },
  editorFontSize: {
    title: "Editor font size",
    description: "Selecciona el tamano de la fuente del editor.",
  },
};
