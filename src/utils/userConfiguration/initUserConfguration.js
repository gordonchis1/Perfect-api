import { load } from "@tauri-apps/plugin-store";
import { defaultUserConfig } from "./defaultConfig";

// ? Create config file
export const initUserConfig = async () => {
  try {
    const config = await load("config.json");
    const isConfigCreated = await config.has("general");

    if (!isConfigCreated) {
      await config.set("general", defaultUserConfig.general);
    }

    await config.save();
  } catch (error) {
    console.error(`Error create config file: ${error}`);
  }
};
