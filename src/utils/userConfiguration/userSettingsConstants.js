export const userSettingsTabs = ["general", "preferences"];

export const userSettingsOptionsMap = {
  perfectApiPath: {
    title: "Ruta de proyectos.",
    description:
      "Selecciona la carpeta donde se guardarán tus proyectos por defecto.",
    type: "path",
  },
  projectFilePath: {
    title: "Archivo de índice de proyectos.",
    description:
      "Define la ubicación del archivo que mantiene el registro de todos los proyectos creados.",

    type: "filePath",
    alert:
      "Cambiar o eliminar este archivo puede hacer que la aplicación no encuentre tus proyectos hasta que se reconstruya el índice.",
  },
  autoUpdate: {
    title: "Actualización automática",
    description:
      "Permite que la aplicación busque y descargue nuevas versiones de forma automática.",
    type: "checkbox",
  },
  version: {
    title: "Version actual: ",
    type: "version",
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
  },
  editorTheme: {
    title: "Tema del editor",
    description: "Selecciona el tema de color para el editor de código.",
    type: "editor-theme",
    themes: ["vs-custom-dark", "vs-custom-light"],
    onChange: (opt, newConfig) => {
      newConfig[tab][section]["editorTheme"] = themeConstants[opt].monacoTheme;
    },
  },
};
