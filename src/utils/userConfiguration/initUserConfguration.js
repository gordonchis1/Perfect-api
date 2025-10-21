import { load } from "@tauri-apps/plugin-store";
import { defaultUserConfig } from "./defaultConfig";
import { exists, writeTextFile } from "@tauri-apps/plugin-fs";
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

    const config = await load("config.json", { defaults: defaultUserConfig });

    await config.save();
  } catch (error) {
    console.error(`Error create config file: ${error}`);
  }
};
