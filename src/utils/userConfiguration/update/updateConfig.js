import { writeTextFile } from "@tauri-apps/plugin-fs";
import { getUserConfigPath } from "../initUserConfguration";

export const updateConfig = async (newConfig) => {
  try {
    const path = await getUserConfigPath();
    await writeTextFile(path, JSON.stringify(newConfig));
  } catch (error) {
    console.error(error);
  }
};
