import "./PreviewTypesLanguagesSelector.css";
import { supportedLanguages } from "../../../../../../utils/constants/LanguagesSelectorConstants";
import { useRef, useState } from "react";
import useClickAway from "../../../../../../Hooks/useClickAway";
import { ChevronDown } from "lucide-react";

export default function PreviewTypesLanguagesSelector({
  currentLanguage,
  setCurrentLanguage,
}) {
  const typesLanguaguesSelectorRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickAway(typesLanguaguesSelectorRef, () => setIsOpen(false));

  return (
    <div
      className="preview-types_languages-selector-container"
      ref={typesLanguaguesSelectorRef}
    >
      <button
        className="language-selector_button-selector"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="button-selector_language-icon">
          {currentLanguage.icon}
        </span>
        <span>{currentLanguage.name}</span>
        <ChevronDown size={20} />
      </button>
      {isOpen && (
        <div className="language-selector_options-container custom-scroll-bar">
          {Object.values(supportedLanguages).map((language) => {
            return (
              <div
                key={language.name}
                className="language-selector_option"
                onClick={() => {
                  setCurrentLanguage(language);
                  setIsOpen(false);
                }}
                style={{
                  backgroundColor:
                    currentLanguage.name === language.name
                      ? "var(--primary-transparent)"
                      : "",
                  border:
                    currentLanguage.name === language.name
                      ? "1px solid var(--primary)"
                      : "",
                  color:
                    currentLanguage.name === language.name
                      ? "var(--primary)"
                      : "",
                }}
              >
                <span className="language-selector_option-icon">
                  {language.icon}
                </span>
                <span className="language-selector_option-name">
                  {language.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
