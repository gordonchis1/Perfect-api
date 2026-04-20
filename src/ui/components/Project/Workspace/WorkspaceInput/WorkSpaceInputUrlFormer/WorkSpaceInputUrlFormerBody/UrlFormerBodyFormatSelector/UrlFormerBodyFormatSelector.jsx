import "./UrlFormerBodyFormatSelector.css";
import { useState, useRef } from "react";
import useClickAway from "../../../../../../../Hooks/useClickAway";
import { ChevronDown } from "lucide-react";
import { useProjectStore } from "../../../../../../../stores/ProjectStore";
import Selector from "../../../../../../Global/Selector/Selector";

export default function UrlFormerBodyFormatSelector({
  currentFormat,
  supportedBodyFormat,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorContainerRef = useRef(null);

  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content,
  );
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile,
  );
  const currentFileId = useProjectStore((store) => store.currentFileId);

  useClickAway(selectorContainerRef, () => {
    setIsOpen(false);
  });

  const handleChangeFormat = (format) => {
    const updatedHeaders = [...content.headers];
    const contentType = format.contentType;

    const indexOfContentType = updatedHeaders.findIndex(
      (header) => header.key === "Content-Type",
    );
    if (indexOfContentType > 0) {
      if (contentType !== null) {
        updatedHeaders[indexOfContentType].value = contentType;
      } else {
        updatedHeaders.splice(indexOfContentType, 1);
      }
    } else {
      if (contentType !== null) {
        updatedHeaders.push({
          key: "Content-Type",
          value: contentType,
          isActive: true,
        });
      }
    }

    updateContentOfOpenFile(currentFileId, {
      ...content,
      body: {
        ...content.body,
        type: format.type,
      },
      headers: updatedHeaders,
    });

    setIsOpen(false);
  };

  return (
    <Selector
      value={supportedBodyFormat[currentFormat]}
      onChange={handleChangeFormat}
    >
      <Selector.Trigger label={supportedBodyFormat[currentFormat].text} />

      <Selector.Options>
        {Object.keys(supportedBodyFormat).map((format) => {
          return (
            <Selector.Option
              key={format}
              label={supportedBodyFormat[format].text}
              value={supportedBodyFormat[format]}
            />
          );
        })}
      </Selector.Options>
    </Selector>
  );
}
