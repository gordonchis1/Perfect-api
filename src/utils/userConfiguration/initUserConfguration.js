import { appDataDir } from "@tauri-apps/api/path";
import { load } from "@tauri-apps/plugin-store";

export const initUserConfig = async () => {
  const appdata = await appDataDir();
  console.log(appdata);
  try {
    const config = await load("config.json");

    await config.save();
  } catch (error) {
    console.error(`Error loading config file: ${error}`);
  }
};
