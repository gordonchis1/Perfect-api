export const WORKSPACE_CONTENT_TYPES = {
  init: "init",
  changeUrl: "url",
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
    case WORKSPACE_CONTENT_TYPES.changeUrl: {
      const { newUrl } = payload;

      return { ...state, url: { ...state.url, url: newUrl } };
    }
  }
};

export default workSpaceContentReducer;
