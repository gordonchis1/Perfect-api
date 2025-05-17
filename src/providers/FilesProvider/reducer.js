export const FILES_REDUCER_ACTIONS = {
  openFile: "openFile",
  changeCurrentTab: "changeCurrentTab",
  closeFile: "closeFile",
};

const filesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
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
    default:
      return state;
  }
};

export default filesReducer;
