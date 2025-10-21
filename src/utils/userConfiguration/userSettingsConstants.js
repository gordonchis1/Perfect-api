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
};
