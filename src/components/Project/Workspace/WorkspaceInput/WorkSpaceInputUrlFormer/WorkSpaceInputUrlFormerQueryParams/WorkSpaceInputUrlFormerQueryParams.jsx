import { useEffect, useState } from "react";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import "./WorkSpaceInputUrlFormerQueryParams.css";
import useFileManagerContext from "../../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../../providers/FileManager/reducer";
import useFilesContext from "../../../../../../Hooks/useFilesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import UrlFormerQueryParamsOption from "./UrlFormerQueryParamsOption/UrlFormerQueryParamsOption";
import UrlFormerQueryParamsInput from "./UrlFormerQueryParamsInput/UrlFormerQueryParamsInput";
import UrlFormerQueryParamsIsActiveCheckbox from "./UrlFormerQueryParamsIsActiveCheckbox/UrlFormerQueryParamsIsActiveCheckbox";
import UrlFormerQueryParamsDeleteQueryButton from "./UrlFormerQueryParamsDeleteQueryButton/UrlFormerQueryParamsDeleteQueryButton";

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

  const handleAddquery = () => {
    setQuerys((prev) => [...prev, { ...defaultQueryObject }]);
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
            <div key={index} className="query-params_query-container">
              <UrlFormerQueryParamsInput
                index={index}
                query={query}
                querys={querys}
                setQuerys={setQuerys}
                inputModifier="key"
              />
              <UrlFormerQueryParamsInput
                index={index}
                query={query}
                querys={querys}
                setQuerys={setQuerys}
                inputModifier="value"
              />
              <UrlFormerQueryParamsIsActiveCheckbox
                index={index}
                query={query}
                querys={querys}
                setQuerys={setQuerys}
              />
              <UrlFormerQueryParamsDeleteQueryButton
                index={index}
                querys={querys}
                setQuerys={setQuerys}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
