import { getStore } from "@tauri-apps/plugin-store";

export const getConfig = async () => {
  try {
    const config = await getStore("config.json");

    return config;
  } catch (error) {
    console.log(`Error in config file: ${error}`);
  }
};
