export const WORKSPACE_CONTENT_TYPES = {
  init: "init",
  changeContent: "ChangeContent",
};

const workSpaceContentReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case WORKSPACE_CONTENT_TYPES.init: {
      const { content } = payload;
      if (content) {
        return content;
      } else {
        return undefined;
      }
    }
    case WORKSPACE_CONTENT_TYPES.changeContent: {
      const { newContent } = payload;

      if (newContent) {
        return newContent;
      }
      return state;
    }
  }
};

export default workSpaceContentReducer;
