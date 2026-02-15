import { useEffect, useState } from "react";
import "./WorkspaceInputUrlHeaders.css";
import ActiveCheckbox from "../../../../../Global/ActiveCheckbox/ActiveCheckbox";
import WorkspaceInputUrlHeadersOption from "./WorkspaceInputUrlHeadersOption/WorkspaceInputUrlHeadersOption";
import WorkspaceInputUrlHeadersNonEditableHeaders from "./WorkspaceInputUrlHeadersNonEditableHeaders/WorkspaceInputUrlHeadersNonEditableHeaders";
import { Plus, Trash2 } from "lucide-react";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import Input from "../../../../../Global/Input/Input";

const nonEditableHeaders = ["Host"];

export default function WorkspaceInputUrlHeaders() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content,
  );
  const [headers, setHeaders] = useState([]);
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile,
  );

  const onHeadersChange = (index, type, value) => {
    if (nonEditableHeaders.includes(headers[index].key)) {
      return;
    }
    const updatedHeaders = [...headers];
    updatedHeaders[index][type] = value;

    updateContentOfOpenFile(currentFileId, {
      ...content,
      headers: updatedHeaders,
    });

    setHeaders(updatedHeaders);
  };

  useEffect(() => {
    try {
      const url = new URL(content.url.inputUrl);
      const updatedHeaders = content.headers.map((header) => ({ ...header }));

      const hostIndex = updatedHeaders.findIndex(
        (header) => header.key === "Host",
      );

      updatedHeaders[hostIndex].value = url.host;
      setHeaders(updatedHeaders);
    } catch {
      setHeaders(content.headers);
    }
  }, [content]);

  const handleChangeIsActive = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index].isActive = !updatedHeaders[index].isActive;

    updateContentOfOpenFile(currentFileId, {
      ...content,
      headers: updatedHeaders,
    });

    setHeaders(updatedHeaders);
  };

  const handleAddHeader = () => {
    const updatedHeaders = [...headers, { key: "", value: "", isActive: true }];

    updateContentOfOpenFile(currentFileId, {
      ...content,
      headers: updatedHeaders,
    });

    setHeaders(updatedHeaders);
  };

  const handleDeleteHeader = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);

    updateContentOfOpenFile(currentFileId, {
      ...content,
      headers: updatedHeaders,
    });

    setHeaders(updatedHeaders);
  };
  const handleDeleteAllHeaders = () => {
    const updatedHeaders = [];

    headers.forEach((header) => {
      if (nonEditableHeaders.includes(header.key)) {
        updatedHeaders.push(header);
      }
    });

    updateContentOfOpenFile(currentFileId, {
      ...content,
      headers: updatedHeaders,
    });

    setHeaders(updatedHeaders);
  };

  return (
    <>
      {headers && (
        <div className="workspace-input-url-headers_container">
          <div className="url-headers_header-container">
            <h1 className="url-headers_title">Headers</h1>
            <div className="url-headers_options-container">
              <WorkspaceInputUrlHeadersOption
                icon={<Plus size={20} />}
                text={"Añadir"}
                onClick={handleAddHeader}
              />
              <WorkspaceInputUrlHeadersOption
                icon={<Trash2 size={20} />}
                text={"Eliminar Todo"}
                onClick={handleDeleteAllHeaders}
                color="red"
              />
            </div>
          </div>
          <div className="url-headers_headers-container">
            {headers.map((header, index) => {
              if (nonEditableHeaders.includes(header.key)) {
                return (
                  <WorkspaceInputUrlHeadersNonEditableHeaders
                    keyValue={header.key}
                    value={header.value}
                    key={index}
                  />
                );
              }

              return (
                <div className="url-headers_header-container" key={index}>
                  <Input
                    type="text"
                    placeholder={"Key"}
                    value={header.key}
                    onChange={(event) => {
                      onHeadersChange(index, "key", event.target.value);
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="Value"
                    value={header.value}
                    onChange={(event) => {
                      onHeadersChange(index, "value", event.target.value);
                    }}
                  />
                  <ActiveCheckbox
                    checked={header.isActive}
                    onChange={() => {
                      handleChangeIsActive(index);
                    }}
                  />
                  <button
                    className="url-headers_delete-button"
                    onClick={() => {
                      handleDeleteHeader(index);
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
