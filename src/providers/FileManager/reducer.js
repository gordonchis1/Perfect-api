import { Directory, VirtualFileSystem } from "../../utils/ProjectFileObject";

export const FILEMANAGER_REDUCER_ACTIONS = {
  init: "init",
  toggleIsOpen: "toggleIsOpen",
};

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
  }
};

export default fileManagerReducer;
