import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PreviewTypesLanguagesSelector.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { supportedLanguages } from "../../../../../../utils/constants/LanguagesSelectorConstants";
import { useRef, useState } from "react";
import useClickAway from "../../../../../../Hooks/useClickAway";

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
        <FontAwesomeIcon icon={faChevronDown} />
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
                      ? "var(--hover)"
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
