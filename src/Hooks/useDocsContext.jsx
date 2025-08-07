import { useContext } from "react";
import { DocsContext } from "../providers/DocsProvider/DocsProvider";

export default function useDocsContext() {
  const context = useContext(DocsContext);

  if (!context) {
    throw new Error("useDocsContext must be used within a <DocsProvider/>");
  }

  return context;
}
