export const WORKSPACE_CONTENT_TYPES = {
  init: "init",
};

const workSpaceContentReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case WORKSPACE_CONTENT_TYPES.init: {
      const { content } = payload;
      if (content) {
        return content;
      }
      return state;
    }
  }
};

export default workSpaceContentReducer;
