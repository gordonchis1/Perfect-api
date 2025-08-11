import { createContext, useEffect, useReducer } from "react";
import { DOCS_REDUCER_ACTION, docsReducer } from "./reducer";
import useWorkSpaceContentContext from "../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { generateDocs } from "../../utils/generateDocs/generateDocs";

export const DocsContext = createContext();

export default function DocsProvider({ children }) {
  const [state, dispatch] = useReducer(docsReducer, "Hoal mundo");
  const [content] = useWorkSpaceContentContext();

  useEffect(() => {
    if (content?.docs === undefined) return;
    dispatch({
      type: DOCS_REDUCER_ACTION.init,
      payload: generateDocs(
        content.docs,
        content.responses[content?.responses?.length - 1]?.response || {}
      ),
    });
  }, [content]);

  return (
    <DocsContext.Provider value={[state, dispatch]}>
      {children}
    </DocsContext.Provider>
  );
}
