import {
  Directory,
  File,
  VirtualFileSystem,
} from "../../utils/ProjectFileObject";
import { UpdateProjectContent } from "../../utils/UpdateProject";

export const FILEMANAGER_REDUCER_ACTIONS = {
  init: "init",
  toggleIsOpen: "toggleIsOpen",
  addDir: "addDir",
  remove: "remove",
  move: "move",
  addFile: "addFile",
  rename: "rename",
};

const fileManagerReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FILEMANAGER_REDUCER_ACTIONS.init: {
      return new VirtualFileSystem(payload);
    }
    case FILEMANAGER_REDUCER_ACTIONS.toggleIsOpen: {
      const { path, type } = payload;
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        if (type === "dir") {
          const clonedNode = clonedVfs.getDirByPath(path);
          clonedNode.toggleIsOpen();
        } else {
          const clonedNode = clonedVfs.getFileByPath(path);
          clonedNode.toggleIsOpen();
        }
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.addDir: {
      const { id, path } = payload;
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        const clonedNode = clonedVfs.getDirByPath(path);
        clonedNode.addChild(new Directory("New directory", true));
        UpdateProjectContent(clonedVfs, id);
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.remove: {
      const { type, path, id } = payload;
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        if (type === "dir") {
          const clonedDir = clonedVfs.getDirByPath(path);
          clonedVfs.remove(clonedDir);
        } else {
          const clonedFile = clonedVfs.getFileByPath(path);
          clonedVfs.remove(clonedFile);
        }
        UpdateProjectContent(clonedVfs, id);
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.addFile: {
      const { id, path } = payload;
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        const clonedNode = clonedVfs.getDirByPath(path);
        clonedNode.addChild(new File("New File"));
        UpdateProjectContent(clonedVfs, id);
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.move: {
      const { moveElement, to, type, id } = payload;
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        if (type === "dir") {
          const clonedDir = clonedVfs.getDirByPath(moveElement);
          clonedVfs.move(clonedDir, to);
        } else {
          const clonedFile = clonedVfs.getFileByPath(moveElement);
          clonedVfs.move(clonedFile, to);
        }
        UpdateProjectContent(clonedVfs, id);
        return clonedVfs;
      }
      return state;
    }
    case FILEMANAGER_REDUCER_ACTIONS.rename: {
      const { type, newName, path, id } = payload;
      if (state instanceof VirtualFileSystem) {
        const clonedVfs = state.clone();
        if (type === "dir") {
          const clonedDir = clonedVfs.getDirByPath(path);
          clonedDir.rename(newName);
        } else {
          const clonedFile = clonedVfs.getFileByPath(path);
          clonedFile.rename(newName);
        }
        UpdateProjectContent(clonedVfs, id);
        return clonedVfs;
      }
      return state;
    }
  }
};

export default fileManagerReducer;
