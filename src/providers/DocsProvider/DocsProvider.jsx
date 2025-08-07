import { createContext, useEffect, useReducer } from "react";
import { DOCS_REDUCER_ACTIONS, docsReducer } from "./reducer";

const docsContextDefaultValue = {
  docContent: "",
  config: {},
};
export const DocsContext = createContext(docsContextDefaultValue);

// cuando current file cambia, se actualiza el contenido del doc que sale de el vfs donde se guardara el contenido del doc

export default function DocsProvider({ children }) {
  const [state, dispatch] = useReducer(docsReducer, docsContextDefaultValue);

  useEffect(() => {
    dispatch({
      type: DOCS_REDUCER_ACTIONS.changeContentAndConfig,
      payload: {
        newContent: {
          content: "Hola mundo",
          config: {},
        },
      },
    });
  }, []);

  return (
    <DocsContext.Provider value={[state, dispatch]}>
      {children}
    </DocsContext.Provider>
  );
}
