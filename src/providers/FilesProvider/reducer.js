import { VirtualFileSystem } from "../../utils/ProjectFileObject";

export const FILES_REDUCER_ACTIONS = {
  openFile: "openFile",
  changeCurrentTab: "changeCurrentTab",
  closeFile: "closeFile",
  init: "init",
  update: "update",
};

const filesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FILES_REDUCER_ACTIONS.init: {
      const { fileManager, initState } = payload;
      if (fileManager instanceof VirtualFileSystem) {
        const newState = { currentFile: initState.currentFile, openFiles: [] };

        initState.openFiles.forEach((fileId) => {
          const fileFromVfs = fileManager.getNodeById(fileId);
          if (!fileFromVfs) return;
          const path = fileManager.getAbsolutePath(fileFromVfs);

          newState.openFiles.push({
            path,
            content: fileFromVfs.content,
            name: fileFromVfs.name,
            currentTab: fileId === newState.currentFile ? true : false,
            id: fileFromVfs.id,
          });
        });

        return newState;
      }
      return state;
    }
    case FILES_REDUCER_ACTIONS.openFile: {
      const { path, content, name, currentTab, id } = payload;
      const newState = [
        ...state.openFiles,
        { path, content, name, currentTab, id },
      ];

      newState.forEach((file) => {
        if (file.id !== id) file["currentTab"] = false;
      });

      return { currentFile: id, openFiles: newState };
    }
    case FILES_REDUCER_ACTIONS.changeCurrentTab: {
      const { id } = payload;
      const newState = [...state.openFiles];
      newState.forEach((file) => {
        if (file.id === id) file["currentTab"] = true;
        else file["currentTab"] = false;
      });
      return { currentFile: id, openFiles: newState };
    }
    case FILES_REDUCER_ACTIONS.closeFile: {
      const { id } = payload;
      const newState = [...state.openFiles];

      const idx = newState.findIndex((file) => file.id === id);
      const deltedElement = newState.splice(idx, 1);

      if (newState.length === 0)
        return { currentFile: "", openFiles: newState };

      let newCurrentTab = "";
      if (deltedElement[0].currentTab) {
        if (!(idx - 1 < 0)) {
          newState[idx - 1].currentTab = true;
          newCurrentTab = newState[idx - 1].id;
        } else {
          newState[idx].currentTab = true;
          newCurrentTab = newState[idx].id;
        }
      }

      return { currentFile: newCurrentTab, openFiles: newState };
    }
    case FILES_REDUCER_ACTIONS.update: {
      const { vfs } = payload;
      const newState = { openFiles: [], currentFile: "" };
      if (vfs instanceof VirtualFileSystem) {
        state.openFiles.forEach((file) => {
          const node = vfs.getNodeById(file.id);

          if (node !== null) {
            const absolutePath = vfs.getAbsolutePath(node);
            newState.openFiles.push({
              path: absolutePath,
              content: node.content,
              name: node.name,
              currentTab: file.currentTab,
              id: node.id,
            });
            if (node.id === state.currentFile) {
              newState.currentFile = node.id;
            }
          }
        });
        if (newState.openFiles.length !== 0 && !newState.currentFile) {
          newState.currentFile =
            newState.openFiles[newState.openFiles.length - 1].id;
          newState.openFiles[newState.openFiles.length - 1].currentTab = true;
        }
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

export default filesReducer;
