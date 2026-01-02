import { useEffect, useState } from "react";
import "./WorkSpaceInputUrlFormerQueryParams.css";
import UrlFormerQueryParamsOption from "./UrlFormerQueryParamsOption/UrlFormerQueryParamsOption";
import UrlFormerQueryParamsInput from "./UrlFormerQueryParamsInput/UrlFormerQueryParamsInput";
import UrlFormerQueryParamsDeleteQueryButton from "./UrlFormerQueryParamsDeleteQueryButton/UrlFormerQueryParamsDeleteQueryButton";
import ActiveCheckbox from "../../../../../Global/ActiveCheckbox/ActiveCheckbox";
import { Plus, Trash2 } from "lucide-react";
import { useProjectStore } from "../../../../../../stores/ProjectStore";

const defaultQueryObject = {
  key: "",
  value: "",
  isActive: true,
};

export default function WorkSpaceInputUrlFormerQueryParams() {
  const content = useProjectStore(
    (store) => store.openFiles[store.currentFileId]?.content
  );
  const [querys, setQuerys] = useState(content.url.queryParams);
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile
  );

  useEffect(() => {
    if (content.url.queryParams) {
      setQuerys(content.url.queryParams);
    }
  }, [content]);

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

      updateContentOfOpenFile(currentFileId, {
        ...content,
        url: {
          ...content.url,
          inputUrl: content.url.inputUrl,
          finalUrl: url.href,
          queryParams: querys,
        },
      });
    } catch {
      console.log("invalid url");
    }
  }, [querys]);

  const handleAddquery = () => {
    setQuerys((prev) => [...prev, { ...defaultQueryObject }]);
  };

  const handleChangeisActive = (index) => {
    const updatedQuerys = [...querys];
    updatedQuerys[index].isActive = !updatedQuerys[index].isActive;
    setQuerys(updatedQuerys);
  };

  return (
    <>
      {querys && (
        <div className="workspace-input-url-former_query-params-container">
          <div className="query-params_header">
            <span className="query-params_title">Query params</span>
            <div className="query-params-header_btn-container">
              <UrlFormerQueryParamsOption
                icon={<Plus size={20} />}
                text="Añadir"
                onClick={handleAddquery}
              />
              <UrlFormerQueryParamsOption
                onClick={() => setQuerys([])}
                text="Eliminar todo"
                icon={<Trash2 size={20} />}
                style={{ color: "var(--destructive)" }}
              />
            </div>
          </div>
          <div className="query-params_params-container">
            {querys.length !== 0 ? (
              querys.map((query, index) => {
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
                    <ActiveCheckbox
                      checked={query.isActive}
                      onChange={() => {
                        handleChangeisActive(index);
                      }}
                    />
                    <UrlFormerQueryParamsDeleteQueryButton
                      index={index}
                      querys={querys}
                      setQuerys={setQuerys}
                    />
                  </div>
                );
              })
            ) : (
              <div className="query-params_no-querys-container">
                No query params
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
