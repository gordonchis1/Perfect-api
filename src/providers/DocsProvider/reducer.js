export const DOCS_REDUCER_ACTION = {
  init: "init",
  updateDocs: "updateDocs",
};

export const docsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case DOCS_REDUCER_ACTION.init: {
      return payload;
    }
    case DOCS_REDUCER_ACTION.updateDocs: {
      return state;
    }
    default:
      return state;
  }
};
