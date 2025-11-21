import { defaultUserConfig } from "./defaultConfig";
import { exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { appDataDir, join } from "@tauri-apps/api/path";
import fillMissings from "./update/fillMissings";
import { updateConfig } from "./update/updateConfig";
import migrate from "./update/migrate";

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

const migrateAndFillConfing = (config) => {
  let userConfig = config;

  userConfig = migrate(config);
  userConfig = fillMissings(userConfig);

  return userConfig;
};

export const initUserConfig = async () => {
  try {
    let userConfig = await getUserConfig();

    if (
      userConfig.configVersion !== undefined &&
      userConfig.configVersion !== defaultUserConfig.configVersion
    ) {
      userConfig = migrateAndFillConfing(userConfig);
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
