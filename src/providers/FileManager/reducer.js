import FileManager from "../../components/Project/FileManager/FileManager";
import {
  Directory,
  File,
  VirtualFileSystem,
} from "../../utils/ProjectFileObject";

export const FILEMANAGER_REDUCER_ACTIONS = {
  init: "init",
  toggleIsOpen: "toggleIsOpen",
  addDir: "addDir",
  remove: "remove",
  move: "move",
  addFile: "addFile",
  rename: "rename",
};

// TODO: add updateProject local for all cases needed
const fileManagerReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FILEMANAGER_REDUCER_ACTIONS.init: {
      return new VirtualFileSystem(payload);
    }
    case FILEMANAGER_REDUCER_ACTIONS.toggleIsOpen: {
      if (state instanceof VirtualFileSystem) {
        // TODO: hacer una funcion para cloanr el nodo y el vfs
        const clonedVfs = state.clone();
        const clonedNode = clonedVfs.getDirByPath(payload);
        clonedNode.toggleIsOpen();
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.addDir: {
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        const clonedNode = clonedVfs.getDirByPath(payload);
        clonedNode.addChild(new Directory("New directory", true));
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.remove: {
      const { type, path } = payload;
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        if (type === "dir") {
          const clonedDir = clonedVfs.getDirByPath(path);
          clonedVfs.remove(clonedDir);
        } else {
          const clonedFile = clonedVfs.getFileByPath(path);
          clonedVfs.remove(clonedFile);
        }
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.addFile: {
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        const clonedNode = clonedVfs.getDirByPath(payload);
        clonedNode.addChild(new File("New File"));
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.move: {
      const { moveElement, to, type } = payload;
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        if (type === "dir") {
          const clonedDir = clonedVfs.getDirByPath(moveElement);
          clonedVfs.move(clonedDir, to);
        } else {
          const clonedFile = clonedVfs.getFileByPath(moveElement);
          clonedVfs.move(clonedFile, to);
        }
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.rename: {
      const { type, newName, path } = payload;
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        if (type === "dir") {
          const clonedDir = clonedVfs.getDirByPath(path);
          clonedDir.rename(newName);
        } else {
          const clonedFile = clonedVfs.getFileByPath(path);
          clonedFile.rename(newName);
        }
        return clonedVfs;
      }
      return state;
    }
  }
};

export default fileManagerReducer;
