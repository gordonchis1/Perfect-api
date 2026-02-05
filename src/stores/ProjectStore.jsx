import { create } from "zustand";
import {
  Directory,
  File,
  FSNode,
  VirtualFileSystem,
} from "../utils/ProjectFileObject";
import { getProjectById } from "../utils/getProjects";
import {
  UpdateProjectContent,
  updateProjectContentAndState,
} from "../utils/UpdateProject";
import { fileContentDefault } from "../utils/constants/ProjectFileConstants";

const initialState = {
  vfs: null,
  renameId: null,
  version: 0,
  openFiles: {},
  currentFileId: null,
  projectId: null,
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
          isRunning: node.content.isRunning,
          id: node.id,
        };
      }
    });

    set({
      vfs,
      currentFileId: state.currentFile,
      openFiles,
      version: 0,
      projectId: id,
    });
  },

  toggleIsOpen: (id) => {
    const vfs = get().vfs;
    if (vfs instanceof VirtualFileSystem) {
      const node = vfs.getNodeById(id);
      node.toggleIsOpen();
      vfs.onChange();
    }
  },

  addDir: async (id) => {
    const vfs = get().vfs;

    if (vfs instanceof VirtualFileSystem) {
      const node = vfs.getNodeById(id);
      if (node.type === "dir") {
        node.addChild(new Directory("New directory", true));
        vfs.onChange();
        await get().save();
      }
    }
  },

  remove: async (node) => {
    const vfs = get().vfs;
    const openFiles = { ...get().openFiles };

    if (openFiles[node.id]) {
      get().closeOpenFile(node.id);
    }

    if (node instanceof FSNode) {
      vfs.remove(node);
      await get().save();
    }
  },

  addFile: async (id, content = null) => {
    const vfs = get().vfs;

    if (vfs instanceof VirtualFileSystem) {
      const newNode = new File("New file", content || fileContentDefault);
      const node = vfs.getNodeById(id);

      if (node.type === "dir") {
        node.addChild(newNode);
        vfs.onChange();
        await get().save();
      } else {
        const parent = vfs.getParentNode(node);
        parent.addChild(newNode);
        vfs.onChange();
        await get().save();
      }

      get().setCurrentFile(newNode.id);
      get().addOpenFile(newNode.id);
    }
  },

  rename: async (id, newName) => {
    const vfs = get().vfs;
    const openFiles = { ...get().openFiles };

    if (openFiles[id]) {
      openFiles[id].name = newName;
      set({ openFiles });
    }

    if (vfs instanceof VirtualFileSystem) {
      const node = vfs.getNodeById(id);
      node.rename(newName);
      vfs.onChange();
      await get().save();
    }
  },

  setRename: (renameId) => set({ renameId }),

  move: async (moveElementId, toId) => {
    const vfs = get().vfs;
    if (vfs instanceof VirtualFileSystem) {
      const nodeToMove = vfs.getNodeById(moveElementId);
      const toNode = vfs.getNodeById(toId);

      if (toNode.type === "dir") {
        vfs.move(nodeToMove, toNode);
        await get().save();
      }
    }
  },

  toggleIsRunning: (node) => {
    const openFiles = { ...get().openFiles };
    const vfs = get().vfs;
    if (node instanceof File && vfs instanceof VirtualFileSystem) {
      openFiles[node.id].isRunning = !openFiles[node.id].isRunning;
      node.toggleIsRunning();
      vfs.onChange();
    }

    set({ openFiles });
  },

  setCurrentFile: (id) => {
    set({ currentFileId: id });
  },

  closeOpenFile: (id) => {
    const openFiles = { ...get().openFiles };

    if (id === get().currentFileId) {
      const idx = Object.keys(openFiles).indexOf(id);
      delete openFiles[id];
      const keys = Object.keys(openFiles);

      if (keys.length === 0) {
        set({ currentFileId: null, openFiles });
        return;
      } else if (idx - 1 >= 0) {
        set({ currentFileId: keys[idx - 1], openFiles });
        return;
      } else {
        set({ currentFileId: keys[0], openFiles });
      }
    } else {
      delete openFiles[id];
    }

    set({ openFiles });
  },
  addOpenFile: (id) => {
    const vfs = get().vfs;
    if (vfs instanceof VirtualFileSystem) {
      const node = vfs.getNodeById(id);
      const openFiles = { ...get().openFiles };
      openFiles[id] = {
        content: node.content,
        name: node.name,
        isRunning: node.content.isRunning,
        id: node.id,
      };
      set({ openFiles });
    }
  },
  updateContentOfOpenFile: async (id, newContent, save = false) => {
    const openFiles = { ...get().openFiles };
    const { vfs } = get();

    openFiles[id].content = newContent;
    set({ openFiles });

    if (save) {
      if (vfs instanceof VirtualFileSystem) {
        const node = vfs.getNodeById(id);
        node.updateContent(newContent);
        await get().save();
      }
    }
  },

  save: async () => {
    const vfs = get().vfs;

    if (vfs instanceof VirtualFileSystem) {
      await UpdateProjectContent(vfs, get().projectId);
    }
  },

  reset: async () => {
    const vfs = get().vfs;
    const openFiles = get().openFiles;

    if (vfs instanceof VirtualFileSystem) {
      Object.keys(openFiles).forEach((fileId) => {
        const node = vfs.getNodeById(fileId);
        node.updateContent(openFiles[fileId].content);
      });

      await updateProjectContentAndState(
        {
          currentFile: get().currentFileId,
          openFiles: Object.keys(openFiles),
        },
        vfs,
        get().projectId,
      );
    }

    set({ ...initialState });
  },
}));

// ! on close file save the contnet changes
