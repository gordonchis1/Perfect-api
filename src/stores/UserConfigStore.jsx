import { create } from "zustand";
import {
  getUserConfigPath,
  initUserConfig,
} from "../utils/userConfiguration/initUserConfguration";
import { writeTextFile } from "@tauri-apps/plugin-fs";

export const useUserConfigStore = create((set) => ({
  config: null,
  initConfig: async () => {
    const config = await initUserConfig();
    set({ config });
  },
  updateConfig: async (newConfig) => {
    try {
      const path = await getUserConfigPath();
      await writeTextFile(path, JSON.stringify(newConfig));
      set({ config: newConfig });
    } catch {
      set((state) => ({ config: state.config }));
    }
  },
}));
