export const FILES_REDUCER_ACTIONS = {
  openFile: "openFile",
  changeCurrentTab: "changeCurrentTab",
};

const filesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FILES_REDUCER_ACTIONS.openFile: {
      const { path, content, name, currentTab } = payload;
      const newState = [...state, { path, content, name, currentTab }];

      newState.forEach((file) => {
        if (file.path !== path) file["currentTab"] = false;
      });

      return newState;
    }
    case FILES_REDUCER_ACTIONS.changeCurrentTab: {
      const { path } = payload;
      const newState = [...state];
      newState.forEach((file) => {
        if (file.path === path) file["currentTab"] = true;
        else file["currentTab"] = false;
      });
      return newState;
    }
    default:
      return state;
  }
};

export default filesReducer;
