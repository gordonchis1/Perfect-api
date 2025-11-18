import { availableTargets } from "httpsnippet-lite";
import "./CodeGeneratorSelector.css";
import { useEffect, useState, useRef } from "react";
import useClickAway from "../../../../../../../Hooks/useClickAway";
import { ChevronDown } from "lucide-react";

const defaultTarget = "javascript";

export default function CodeGeneratorSelector({
  currentTarget,
  setCurrentTarget,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [targets, setTargets] = useState(null);
  const optionsContainerRef = useRef(null);
  useClickAway(optionsContainerRef, () => setIsOpen(false));

  useEffect(() => {
    if (!targets) return;

    const findDefaultTarget = () => {
      return targets.filter((target) => target.key == defaultTarget)[0];
    };

    setCurrentTarget(findDefaultTarget());
  }, [targets]);

  useEffect(() => {
    setTargets(availableTargets());
  }, []);

  const handleChangeTarget = (target) => {
    setCurrentTarget(target);
    setIsOpen(false);
  };

  return (
    <div className="code-generator_selector-container">
      {currentTarget && (
        <button
          onClick={() => setIsOpen(true)}
          className="code-generator_selector-current-btn"
        >
          <span> {currentTarget.title}</span>
          <ChevronDown size={20} />
        </button>
      )}
      {targets && isOpen && (
        <div
          className="code-generator_options-container custom-scroll-bar"
          ref={optionsContainerRef}
        >
          {targets.map((target) => {
            return (
              <button
                className="code-generator-selector_option-btn"
                onClick={() => handleChangeTarget(target)}
                key={target.key}
                style={
                  target == currentTarget
                    ? {
                        border: "1px solid var(--primary)",
                        background: "var(--primary-transparent)",
                        color: "var(--primary)",
                      }
                    : {}
                }
              >
                {target.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
