export const FILES_REDUCER_ACTIONS = {
  openFile: "openFile",
};

const filesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case FILES_REDUCER_ACTIONS.openFile: {
      const { path, content, name } = payload;
      return [...state, { path, content, name }];
    }
    default:
      return state;
  }
};

export default filesReducer;
