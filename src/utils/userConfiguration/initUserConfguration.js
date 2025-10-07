import { load } from "@tauri-apps/plugin-store";
import { defaultUserConfig } from "./defaultConfig";

// ? Create config file
// ! refactor code
export const initUserConfig = async () => {
  try {
    const config = await load("config.json");
    const isConfigCreated = await config.has("general");
    const isPreferencesCreated = await config.has("preferences");

    if (!isConfigCreated) {
      await config.set("general", defaultUserConfig.general);
    }
    if (!isPreferencesCreated) {
      await config.set("preferences", defaultUserConfig.preferences);
    }

    await config.save();
  } catch (error) {
    console.error(`Error create config file: ${error}`);
  }
};
