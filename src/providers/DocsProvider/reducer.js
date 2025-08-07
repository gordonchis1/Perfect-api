export const DOCS_REDUCER_ACTIONS = {
  changeContentAndConfig: "changeContentAndConfig",
};

export const docsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "changeContentAndConfig":
      return payload.newContent;
    default:
      return state;
  }
};
