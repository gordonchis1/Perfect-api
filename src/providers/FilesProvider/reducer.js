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
      const newState = [...state, { path, content, name, currentTab, id }];

      newState.forEach((file) => {
        if (file.id !== id) file["currentTab"] = false;
      });

      return newState;
    }
    case FILES_REDUCER_ACTIONS.changeCurrentTab: {
      const { id } = payload;
      const newState = [...state];
      newState.forEach((file) => {
        if (file.id === id) file["currentTab"] = true;
        else file["currentTab"] = false;
      });
      return newState;
    }
    case FILES_REDUCER_ACTIONS.closeFile: {
      const { id } = payload;
      const newState = [...state];

      const idx = newState.findIndex((file) => file.id === id);
      const deltedElement = newState.splice(idx, 1);

      if (newState.length === 0) return newState;

      if (deltedElement[0].currentTab) {
        if (!idx - 1 < newState.length) {
          newState[idx - 1].currentTab = true;
        } else {
          newState[newState.length - 1].currentTab = true;
        }
      }

      return newState;
    }
    default:
      return state;
  }
};

export default filesReducer;
