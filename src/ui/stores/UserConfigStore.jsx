import { create } from "zustand";
import { initUserConfig } from "../utils/userConfiguration/initUserConfguration";
import { updateConfig } from "../utils/userConfiguration/update/updateConfig";

export const useUserConfigStore = create((set) => ({
  config: null,

  initConfig: async () => {
    const config = await initUserConfig();
    set({ config });
  },
  updateConfig: async (newConfig) => {
    try {
      await updateConfig(newConfig);
      set({ config: newConfig });
    } catch {
      set((state) => ({ config: state.config }));
    }
  },
}));
