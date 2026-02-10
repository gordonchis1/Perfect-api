import "./PreviewTypesLanguagesSelector.css";
import { supportedLanguages } from "../../../../../../utils/constants/LanguagesSelectorConstants";
import { ChevronDown } from "lucide-react";
import Selector from "../../../../../Global/Selector/Selector";

export default function PreviewTypesLanguagesSelector({
  currentLanguage,
  setCurrentLanguage,
}) {
  return (
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
              {selected?.icon}
            </span>
            <span>{selected?.name}</span>
            <ChevronDown size={20} />
          </button>
        )}
      </Selector.Trigger>
      <Selector.Options className="language-selector_options-container custom-scroll-bar">
        {Object.values(supportedLanguages).map((language) => {
          return (
            <Selector.Option key={language.name} value={language}>
              {({ isSelected }) => (
                <div
                  className="language-selector_option"
                  style={{
                    backgroundColor: isSelected
                      ? "var(--primary-transparent)"
                      : "",
                    border: isSelected ? "1px solid var(--primary)" : "",
                    color: isSelected ? "var(--primary)" : "",
                  }}
                >
                  <span className="language-selector_option-icon">
                    {language.icon}
                  </span>
                  <span className="language-selector_option-name">
                    {language.name}
                  </span>
                </div>
              )}
            </Selector.Option>
          );
        })}
      </Selector.Options>
    </Selector>
  );
}
