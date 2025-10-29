import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from "quicktype-core";
import useWorkspacePreviewContext from "../../../../../Hooks/useWorkspacePreviewContext";
import WorkspacePreviewHeader from "../WorkspacePreviewResponse/WorkSpacePreviewHeader/WorkspacePreviewHeader";
import "./WorkSpacePreviewTypes.css";
import { useEffect, useRef, useState } from "react";
import PreviewTypesCopyButton from "./PreviewTypesCopyButton/PreviewTypesCopyButton";
import PreviewTypesLanguagesSelector from "./PreviewTypesLanguagesSelector/PreviewTypesLanguagesSelector";
import { supportedLanguages } from "../../../../../utils/constants/LanguagesSelectorConstants";
import { Editor } from "@monaco-editor/react";
import LoaderSpiner from "../../../../Global/LoaderSpiner/LoaderSpiner";

export default function WorkSpacePreviewTypes() {
  const syntaxHighlighterRef = useRef(null);
  const codeBlockContainerRef = useRef(null);
  const [workspacePreviewContext] = useWorkspacePreviewContext();
  const [types, setTypes] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(
    supportedLanguages.typescript
  );

  const convertjsonToTypes = async (targetLanguague) => {
    const jsonInput = jsonInputForTargetLanguage(targetLanguague);

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
      lang: targetLanguague,
      rendererOptions: {
        "just-types": "true",
      },
    });
  };

  useEffect(() => {
    const getTypes = async () => {
      if (!currentLanguage.language) return;
      const { lines } = await convertjsonToTypes(currentLanguage.language);
      setTypes(lines.join("\n"));
    };

    getTypes();
  }, [workspacePreviewContext, currentLanguage]);

  useEffect(() => {
    if (syntaxHighlighterRef.current && codeBlockContainerRef.current) {
      syntaxHighlighterRef.current.style.height = `${codeBlockContainerRef.current.offsetHeight}px`;
    }
  }, [syntaxHighlighterRef, codeBlockContainerRef]);

  return (
    <>
      {workspacePreviewContext.responses.length > 0 && (
        <div className="workspace-preview_types-container">
          <PreviewTypesLanguagesSelector
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
          />
          <div
            className="preview-types_block-code-container"
            ref={codeBlockContainerRef}
          >
            <PreviewTypesCopyButton types={types} />

            <Editor
              loading={<LoaderSpiner />}
              value={types}
              language={currentLanguage.languageSyntax}
              theme="vs-dark"
              options={{
                fontFamily: "var(--mono-font)",
                fontSize: 16,
                minimap: false,
                readOnly: true,
                readOnlyMessage: false,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
