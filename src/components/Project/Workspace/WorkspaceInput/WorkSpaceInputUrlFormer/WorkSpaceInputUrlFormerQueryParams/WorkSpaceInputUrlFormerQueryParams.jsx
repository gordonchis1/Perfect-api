import { useEffect, useState } from "react";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import "./WorkSpaceInputUrlFormerQueryParams.css";
import useFileManagerContext from "../../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import UrlFormerQueryParamsOption from "./UrlFormerQueryParamsOption/UrlFormerQueryParamsOption";

const defaultQueryObject = {
  key: "",
  value: "",
  isActive: true,
};

export default function WorkSpaceInputUrlFormerQueryParams() {
  const [content] = useWorkSpaceContentContext();
  const [querys, setQuerys] = useState(content.url.queryParams);
  const [, dispatchFileManagerState] = useFileManagerContext();
  const [filesState] = useFilesContext();

  useEffect(() => {
    if (filesState.currentFile) {
      setQuerys(content.url.queryParams);
    }
  }, [filesState, content.url]);

  const handleChangeQuery = (type, newValue, index) => {
    const updatedQuerys = [...querys];
    updatedQuerys[index][type] = newValue;
    setQuerys(updatedQuerys);
  };

  const handleAddquery = () => {
    setQuerys((prev) => [...prev, { ...defaultQueryObject }]);
  };

  useEffect(() => {
    try {
      const url = new URL(content.url.inputUrl);
      const params = new URLSearchParams(url.search);
      const updatedParams = new URLSearchParams();

      for (let [key, value] of params.entries()) {
        updatedParams.append(key, value);
      }

      querys.forEach((param) => {
        if (param.isActive) {
          updatedParams.append(param.key, param.value);
        }
      });
      url.search = updatedParams.toString();

      dispatchFileManagerState({
        type: FILEMANAGER_REDUCER_ACTIONS.updateContentWithoutSaving,
        payload: {
          nodeId: filesState.currentFile,
          newContent: {
            ...content,
            url: {
              ...content.url,
              inputUrl: content.url.inputUrl,
              parseUrl: url.href,
              queryParams: querys,
            },
          },
        },
      });
    } catch {
      console.log("invalid url");
    }
  }, [querys]);

  const handleChangeisActive = (index) => {
    const updatedQuerys = [...querys];
    updatedQuerys[index].isActive = !updatedQuerys[index].isActive;
    setQuerys(updatedQuerys);
  };

  const handleDeleteQuery = (index) => {
    const updatedQuerys = [...querys];
    updatedQuerys.splice(index, 1);
    setQuerys(updatedQuerys);
  };

  return (
    <div className="workspace-input-url-former_query-params-container">
      <span className="query-params_title">Query params</span>
      <div className="query-params_options-container">
        <UrlFormerQueryParamsOption
          icon={faAdd}
          text="Añadir"
          onClick={handleAddquery}
        />
        <UrlFormerQueryParamsOption
          onClick={() => setQuerys([])}
          text="Eliminar todo"
          icon={faTrash}
          style={{ color: "red" }}
        />
      </div>
      <div className="query-params_params-container">
        {querys.map((query, index) => {
          return (
            <div key={index}>
              <input
                value={query.key}
                type="text"
                onChange={(event) =>
                  handleChangeQuery("key", event.target.value, index)
                }
              />
              <input
                value={query.value}
                type="text"
                onChange={(event) =>
                  handleChangeQuery("value", event.target.value, index)
                }
              />
              <input
                type="checkbox"
                checked={query.isActive}
                onChange={() => handleChangeisActive(index)}
              />
              <button onClick={() => handleDeleteQuery(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
