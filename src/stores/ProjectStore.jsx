import { create } from "zustand";
import {
  Directory,
  File,
  FSNode,
  VirtualFileSystem,
} from "../utils/ProjectFileObject";
import { getProjectById } from "../utils/getProjects";

const initialState = {
  vfs: null,
  renameId: null,
  version: 0,
  openFiles: {},
  currentFileId: null,
};

export const useProjectStore = create((set, get) => ({
  ...initialState,

  init: async (id) => {
    const jsonData = await getProjectById(id);
    const { content, state } = jsonData;

    const vfs = new VirtualFileSystem(content);

    vfs.onChange = () => {
      set((storeState) => ({ version: storeState.version + 1 }));
    };

    const openFiles = {};

    state.openFiles.forEach((fileId) => {
      const node = vfs.getNodeById(fileId);
      if (node) {
        openFiles[fileId] = {
          content: node.content,
          name: node.name,
          isRuning: node.content.isRuning,
        };
      }
    });

    set({ vfs, currentFileId: state.currentFile, openFiles, version: 0 });
  },

  toggleIsOpen: (id) => {
    const vfs = get().vfs;
    if (vfs instanceof VirtualFileSystem) {
      const node = vfs.getNodeById(id);
      node.toggleIsOpen();
      vfs.onChange();
    }
  },

  addDir: (id) => {
    const vfs = get().vfs;

    if (vfs instanceof VirtualFileSystem) {
      const node = vfs.getNodeById(id);
      if (node.type === "dir") {
        node.addChild(new Directory("New directory", true));
        vfs.onChange();
      }
    }
  },

  remove: (node) => {
    const vfs = get().vfs;
    if (node instanceof FSNode) {
      vfs.remove(node);
    }
  },

  addFile: (id) => {
    const vfs = get().vfs;

    if (vfs instanceof VirtualFileSystem) {
      const node = vfs.getNodeById(id);
      if (node.type === "dir") {
        node.addChild(new File("New file"));
        vfs.onChange();
      }
    }
  },

  rename: (id, newName) => {
    const vfs = get().vfs;
    if (vfs instanceof VirtualFileSystem) {
      const node = vfs.getNodeById(id);
      node.rename(newName);
      vfs.onChange();
    }
  },

  setRename: (renameId) => set({ renameId }),

  move: (moveElementId, toId) => {
    const vfs = get().vfs;
    if (vfs instanceof VirtualFileSystem) {
      const nodeToMove = vfs.getNodeById(moveElementId);
      const toNode = vfs.getNodeById(toId);

      if (toNode.type === "dir") {
        vfs.move(nodeToMove, toNode);
      }
    }
  },

  toggleIsRuning: (node) => {
    const vfs = get().vfs;
    if (node instanceof File && vfs instanceof VirtualFileSystem) {
      node.toggleIsRuning();
      vfs.onChange();
    }
  },

  reset: () => set({ ...initialState }),
}));
