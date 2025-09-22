import { load } from "@tauri-apps/plugin-store";

// ? Create config file
export const initUserConfig = async () => {
  try {
    const config = await load("config.json");

    await config.save();
  } catch (error) {
    console.error(`Error create config file: ${error}`);
  }
};
