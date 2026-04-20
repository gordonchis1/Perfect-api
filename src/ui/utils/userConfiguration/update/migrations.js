export const migrations = {
  2: (config) => {
    if (typeof config?.preferences?.appearance?.editorFontSize == "string") {
      config.preferences.appearance.editorFontSize = [
        config.preferences.appearance.editorFontSize,
      ];
    }
    return config;
  },
};
