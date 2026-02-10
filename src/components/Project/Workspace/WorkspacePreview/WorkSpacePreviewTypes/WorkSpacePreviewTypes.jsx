import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from "quicktype-core";
import "./WorkSpacePreviewTypes.css";
import { useEffect, useRef, useState } from "react";
import PreviewTypesCopyButton from "./PreviewTypesCopyButton/PreviewTypesCopyButton";
import PreviewTypesLanguagesSelector from "./PreviewTypesLanguagesSelector/PreviewTypesLanguagesSelector";
import { supportedLanguages } from "../../../../../utils/constants/LanguagesSelectorConstants";
import { Editor } from "@monaco-editor/react";
import LoaderSpiner from "../../../../Global/LoaderSpiner/LoaderSpiner";
import { useUserConfigStore } from "../../../../../stores/UserConfigStore";
import useCurrentEntry from "../../../../../Hooks/useCurrentEntry";
import Selector from "../../../../Global/Selector/Selector";
import { ChevronDown } from "lucide-react";

export default function WorkSpacePreviewTypes() {
  const syntaxHighlighterRef = useRef(null);
  const config = useUserConfigStore((state) => state.config);
  const codeBlockContainerRef = useRef(null);
  const [types, setTypes] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(
    supportedLanguages.typescript,
  );
  const currentEntry = useCurrentEntry();

  const convertjsonToTypes = async (targetLanguague) => {
    const jsonInput = jsonInputForTargetLanguage(targetLanguague);

    await jsonInput.addSource({
      name: "Response",
      samples: [JSON.stringify(currentEntry?.response?.body?.raw)],
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
  }, [currentEntry, currentLanguage]);

  useEffect(() => {
    if (syntaxHighlighterRef.current && codeBlockContainerRef.current) {
      syntaxHighlighterRef.current.style.height = `${codeBlockContainerRef.current.offsetHeight}px`;
    }
  }, [syntaxHighlighterRef, codeBlockContainerRef]);

  return (
    <>
      {currentEntry?.response?.body?.raw && (
        <div className="workspace-preview_types-container">
          {/* ! delate this div */}
          <div style={{ display: "flex" }}>
            <PreviewTypesLanguagesSelector
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
            />
            <Selector
              value={currentLanguage}
              onChange={(language) => {
                setCurrentLanguage(language);
              }}
            >
              <Selector.Trigger>
                {({ selected, isOpen }) => (
                  <button className="language-selector_button-selector">
                    <span className="button-selector_language-icon">
                      {selected.icon}
                    </span>
                    <span>{selected.name}</span>
                    <ChevronDown size={20} />
                  </button>
                )}
              </Selector.Trigger>
              <Selector.Options>
                {Object.values(supportedLanguages).map((language) => {
                  return (
                    <Selector.Option
                      key={language.name}
                      value={language}
                      label={language.name}
                    />
                  );
                })}
              </Selector.Options>
            </Selector>
          </div>
          <div
            className="preview-types_block-code-container"
            ref={codeBlockContainerRef}
          >
            <PreviewTypesCopyButton types={types} />

            <Editor
              loading={<LoaderSpiner />}
              value={types}
              language={currentLanguage.languageSyntax}
              theme={config.preferences.editor.editorTheme || "vs-dark"}
              options={{
                fontFamily: "var(--mono-font)",
                fontSize: config.preferences.editor.editorFontSize,
                minimap: {
                  enabled: config.preferences.editor.editorMiniMap || false,
                },
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
