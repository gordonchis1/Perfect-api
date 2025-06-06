import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from "quicktype-core";
import useWorkspacePreviewContext from "../../../../../Hooks/useWorkspacePreviewContext";
import WorkspacePreviewHeader from "../WorkspacePreviewResponse/WorkSpacePreviewHeader/WorkspacePreviewHeader";
import "./WorkSpacePreviewTypes.css";
import { useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { arta } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function WorkSpacePreviewTypes() {
  const syntaxHighlighterRef = useRef(null);
  const codeBlockContainerRef = useRef(null);
  const [workspacePreviewContext] = useWorkspacePreviewContext();
  const [types, setTypes] = useState("");

  const convertjsonToTypes = async () => {
    const jsonInput = jsonInputForTargetLanguage("typescript");

    await jsonInput.addSource({
      name: "Response",
      samples: [
        JSON.stringify(
          workspacePreviewContext.responses[
            workspacePreviewContext.currentResponseIdx
          ].response,
          null,
          2
        ),
      ],
    });

    const inputData = new InputData();

    inputData.addInput(jsonInput);

    return await quicktype({
      inputData,
      lang: "typescript",
      rendererOptions: {
        "just-types": "true",
      },
    });
  };

  useEffect(() => {
    const getTypes = async () => {
      const { lines } = await convertjsonToTypes();
      setTypes(lines.join("\n"));
    };

    getTypes();
  }, [workspacePreviewContext]);

  useEffect(() => {
    if (syntaxHighlighterRef.current && codeBlockContainerRef.current) {
      console.log(codeBlockContainerRef.current.offsetHeight);
      syntaxHighlighterRef.current.style.height = `${codeBlockContainerRef.current.offsetHeight}px`;
    }
  }, [syntaxHighlighterRef, codeBlockContainerRef]);

  return (
    <>
      {workspacePreviewContext.responses.length > 0 && (
        <div className="workspace-preview_types-container">
          <WorkspacePreviewHeader />
          <div
            className="preview-types_block-code-container"
            ref={codeBlockContainerRef}
          >
            <SyntaxHighlighter
              language="typescript"
              className="block-code_highlighter custom-scroll-bar"
              style={arta}
              showLineNumbers
              ref={syntaxHighlighterRef}
            >
              {types}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </>
  );
}
