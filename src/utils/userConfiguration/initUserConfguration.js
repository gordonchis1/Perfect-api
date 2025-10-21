import { defaultUserConfig } from "./defaultConfig";
import { exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { appDataDir, join } from "@tauri-apps/api/path";

// ? Create config file
// ! Compre local config with default config
export const initUserConfig = async () => {
  try {
    const appRoute = await appDataDir();
    const path = await join(appRoute, "config.json");
    const configExsist = await exists(path);

    if (!configExsist) {
      await writeTextFile(path, JSON.stringify(defaultUserConfig));
    }

    const userConfig = await readTextFile(path);
    const parsedUserConfig = JSON.parse(userConfig);

    return parsedUserConfig;
  } catch (error) {
    console.error(`Error create config file: ${error}`);
  }
};

export const getUserConfigPath = async () => {
  try {
    const appRoute = await appDataDir();
    const path = await join(appRoute, "config.json");
    return path;
  } catch (error) {
    console.error(error);
  }
};
