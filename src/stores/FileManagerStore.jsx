import { create } from "zustand";
import { VirtualFileSystem } from "../utils/ProjectFileObject";
import { getProjectById } from "../utils/getProjects";

const initialState = {
  vfs: null,
  version: 0,
};

export const useFilemanagerStore = create((set, get) => ({
  ...initialState,

  init: async (id) => {
    const jsonData = await getProjectById(id);
    const { content } = jsonData;

    const vfs = new VirtualFileSystem(content);

    vfs.onChange = () => {
      set((state) => ({ version: state.version + 1 }));
    };

    set({ vfs, version: 0 });
  },

  toggleIsOpen: (id) => {
    const vfs = get().vfs;
    if (vfs instanceof VirtualFileSystem) {
      const node = vfs.getNodeById(id);
      node.toggleIsOpen();
      vfs.onChange();
    }
  },

  reset: () => set({ ...initialState }),
}));
