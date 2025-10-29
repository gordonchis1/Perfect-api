import { useState } from "react";
import "./MultipleContainer.css";

export default function MultipleContainer({
  objectContainers,
  defaultContainer,
  mainContainerclassName,
}) {
  const [container, setContainer] = useState(defaultContainer);

  const handleChangeContainer = (keyContainer) => {
    setContainer(keyContainer);
  };

  return (
    <div className={mainContainerclassName}>
      <div className="multiple-container_options-container">
        {Object.keys(objectContainers).map((keyContainer) => {
          return (
            <button
              onClick={() => handleChangeContainer(keyContainer)}
              key={keyContainer}
              className="multiple-container_option"
              style={{
                border:
                  container == keyContainer ? " 1px solid var(--primary)" : "",
                color:
                  container == keyContainer
                    ? "var(--primary)"
                    : "var(--muted-foreground)",
              }}
            >
              {keyContainer}
            </button>
          );
        })}
      </div>
      <div className="multiple-container_body-container">
        {objectContainers[container].component}
      </div>
    </div>
  );
}
