export const DOCS_REDUCER_ACTION = {
  init: "init",
};

export const docsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case DOCS_REDUCER_ACTION.init: {
      return payload;
    }
    default:
      return state;
  }
};
