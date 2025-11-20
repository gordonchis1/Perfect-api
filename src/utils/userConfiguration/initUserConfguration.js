import { defaultUserConfig } from "./defaultConfig";
import { exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { appDataDir, join } from "@tauri-apps/api/path";
import fillMissings from "./update/fillMissings";
import { updateConfig } from "./update/updateConfig";

const getUserConfig = async () => {
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
    throw new Error(error);
  }
};

// ? Create config file
// ! Compre local config with default config
export const initUserConfig = async () => {
  try {
    let userConfig = await getUserConfig();

    if (
      userConfig.configVersion !== undefined &&
      userConfig.configVersion !== defaultUserConfig.configVersion
    ) {
      console.log("user cofig version:", userConfig.configVersion);
      console.log("app config version:", defaultUserConfig.configVersion);

      // ? migrate config
      // ? migrate config versions
      // ? auto fill
      userConfig = fillMissings(userConfig);
      await updateConfig(userConfig);
    }
    return userConfig;
  } catch (error) {
    console.error(error);
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
