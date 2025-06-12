import { useEffect, useState } from "react";
import "./WorkspaceInputUrlHeaders.css";
import useFileManagerContext from "../../../../../../Hooks/FileManager/useFileMangerContext";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import ActiveCheckbox from "../../../../../Global/ActiveCheckbox/ActiveCheckbox";

const nonEditableHeaders = ["Host", "Accept"];

export default function WorkspaceInputUrlHeaders() {
  const [content] = useWorkSpaceContentContext();
  const [headers, setHeaders] = useState([]);
  const [, filemanagerDispatch] = useFileManagerContext();
  const [filesContext] = useFilesContext();

  const onHeadersChange = (index, type, value) => {
    if (nonEditableHeaders.includes(headers[index].key)) {
      return;
    }
    const updatedHeaders = [...headers];
    updatedHeaders[index][type] = value;
    filemanagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesContext.currentFile,
        newContent: {
          ...content,
          headers: updatedHeaders,
        },
      },
    });
    setHeaders(updatedHeaders);
  };

  useEffect(() => {
    try {
      const url = new URL(content.url.inputUrl);
      const updatedHeaders = content.headers.map((header) => ({ ...header }));

      const hostIndex = updatedHeaders.findIndex(
        (header) => header.key === "Host"
      );

      updatedHeaders[hostIndex].value = url.host;
      setHeaders(updatedHeaders);
    } catch {
      setHeaders(content.headers);
    }
  }, [filesContext.currentFile, content]);

  const handleChangeIsActive = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index].isActive = !updatedHeaders[index].isActive;
    filemanagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesContext.currentFile,
        newContent: {
          ...content,
          headers: updatedHeaders,
        },
      },
    });
    setHeaders(updatedHeaders);
  };

  const handleAddHeader = () => {
    const updatedHeaders = [...headers, { key: "", value: "", isActive: true }];

    filemanagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesContext.currentFile,
        newContent: {
          ...content,
          headers: updatedHeaders,
        },
      },
    });

    setHeaders(updatedHeaders);
  };

  const handleDeleteHeader = (index) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);

    filemanagerDispatch({
      type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
      payload: {
        nodeId: filesContext.currentFile,
        newContent: {
          ...content,
          headers: updatedHeaders,
        },
      },
    });

    setHeaders(updatedHeaders);
  };

  return (
    <>
      {headers && (
        <div className="workspace-input-url-headers_container">
          <h1 className="url-headers_title">Headers</h1>
          <div className="url-headers_options-container">
            <button
              className="headers-options_option-button"
              onClick={handleAddHeader}
            >
              <span>Añadir</span>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
          <div className="url-headers_headers-container">
            {headers.map((header, index) => {
              if (nonEditableHeaders.includes(header.key)) {
                return (
                  <div className="url-headers_header-container" key={index}>
                    <div className="url-headers_ineditable-value">
                      {header.key}
                    </div>
                    <div className="url-headers_ineditable-value">
                      {header.value}
                    </div>
                  </div>
                );
              }

              return (
                <div className="url-headers_header-container" key={index}>
                  <input
                    type="text"
                    placeholder="key"
                    value={header.key}
                    onChange={(event) => {
                      onHeadersChange(index, "key", event.target.value);
                    }}
                    className="url-headers_header-input"
                  />
                  <input
                    type="text"
                    placeholder="value"
                    value={header.value}
                    onChange={(event) => {
                      onHeadersChange(index, "value", event.target.value);
                    }}
                    className="url-headers_header-input"
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
                    <FontAwesomeIcon icon={faTrash} />
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
