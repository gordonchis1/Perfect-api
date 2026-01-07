import { createContext, useEffect, useReducer } from "react";
import { useProjectStore } from "../../stores/ProjectStore";

export const WorkSpacePreviewContext = createContext(undefined);

const defaultWorkSpacePreviewState = {
  currentResponseIdx: 0,
  responses: [],
};

export const WORKSPACE_PREVIEW_ACTIONS = {
  SET_CURRENT_RESPONSE_IDX: "SET_CURRENT_RESPONSE_IDX",
  CHANGE_RESPONSES: "CHANGE_RESPONSES",
};

const workspacePreviewReducer = (state, action) => {
  switch (action.type) {
    case WORKSPACE_PREVIEW_ACTIONS.SET_CURRENT_RESPONSE_IDX:
      return {
        ...state,
        currentResponseIdx: action.payload,
      };
    case WORKSPACE_PREVIEW_ACTIONS.CHANGE_RESPONSES: {
      const { responses } = action.payload;
      const newResponses = [];

      return {
        ...state,
        responses: newResponses,
      };
    }
    default:
      return state;
  }
};

// This provider is used to manage the workspace preview index state.
export default function WorkSpacePreviewProvider({ children }) {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );
  const [state, dispatch] = useReducer(
    workspacePreviewReducer,
    defaultWorkSpacePreviewState
  );

  useEffect(() => {
    dispatch({
      type: WORKSPACE_PREVIEW_ACTIONS.CHANGE_RESPONSES,
      payload: { responses: content.history || [] },
    });
  }, [content.history]);

  return (
    <WorkSpacePreviewContext.Provider value={[state, dispatch]}>
      {children}
    </WorkSpacePreviewContext.Provider>
  );
}
