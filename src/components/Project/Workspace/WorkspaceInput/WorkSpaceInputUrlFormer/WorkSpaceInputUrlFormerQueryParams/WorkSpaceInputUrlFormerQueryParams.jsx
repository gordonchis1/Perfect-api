import "./WorkSpaceInputUrlFormerQueryParams.css";
import UrlFormerQueryParamsOption from "./UrlFormerQueryParamsOption/UrlFormerQueryParamsOption";
import UrlFormerQueryParamsInput from "./UrlFormerQueryParamsInput/UrlFormerQueryParamsInput";
import UrlFormerQueryParamsDeleteQueryButton from "./UrlFormerQueryParamsDeleteQueryButton/UrlFormerQueryParamsDeleteQueryButton";
import ActiveCheckbox from "../../../../../Global/ActiveCheckbox/ActiveCheckbox";
import { Plus, Trash2 } from "lucide-react";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import { nanoid } from "nanoid";

const defaultQueryObject = {
  key: "",
  value: "",
  isActive: true,
};

export default function WorkSpaceInputUrlFormerQueryParams() {
  const currentFileId = useProjectStore((store) => store.currentFileId);
  const content = useProjectStore(
    (store) => store.openFiles[currentFileId]?.content,
  );
  const updateContentOfOpenFile = useProjectStore(
    (store) => store.updateContentOfOpenFile,
  );
  const querys = content?.url?.queryParams;
  const rebuildFinalString = useProjectStore(
    (store) => store.rebuildFinalString,
  );

  const handleAddQuery = () => {
    updateContentOfOpenFile(
      currentFileId,
      {
        ...content,
        url: {
          ...content.url,
          queryParams: [
            ...content.url.queryParams,
            { ...defaultQueryObject, id: nanoid() },
          ],
        },
      },
      true,
    );

    rebuildFinalString();
  };

  const handleChangeValue = (event, idx) => {
    const value = event.target.value;
    const updatedQuerys = [...querys];

    updatedQuerys[idx].value = value;

    updateContentOfOpenFile(currentFileId, {
      ...content,
      url: {
        ...content.url,
        queryParams: updatedQuerys,
      },
    });

    rebuildFinalString();
  };

  const handleChangeKey = (event, idx) => {
    const value = event.target.value;
    const updatedQuerys = [...querys];

    updatedQuerys[idx].key = value;

    updateContentOfOpenFile(currentFileId, {
      ...content,
      url: {
        ...content.url,
        queryParams: updatedQuerys,
      },
    });
    rebuildFinalString();
  };

  const handleChangeIsActive = (idx) => {
    const updatedQuerys = [...querys];

    updatedQuerys[idx].isActive = !updatedQuerys[idx].isActive;

    updateContentOfOpenFile(
      currentFileId,
      {
        ...content,
        url: {
          ...content.url,
          queryParams: updatedQuerys,
        },
      },
      true,
    );
    rebuildFinalString();
  };

  const handleDelate = (idx) => {
    const updatedQuerys = [...querys];

    updatedQuerys.splice(idx, 1);

    updateContentOfOpenFile(
      currentFileId,
      {
        ...content,
        url: {
          ...content.url,
          queryParams: updatedQuerys,
        },
      },
      true,
    );
    rebuildFinalString();
  };

  const handleDelateAll = () => {
    if (querys.length == 0) return;
    updateContentOfOpenFile(
      currentFileId,
      {
        ...content,
        url: {
          ...content.url,
          queryParams: [],
        },
      },
      true,
    );
    rebuildFinalString();
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
                onClick={handleAddQuery}
              />
              <UrlFormerQueryParamsOption
                onClick={handleDelateAll}
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
                  <div key={query.id} className="query-params_query-container">
                    <UrlFormerQueryParamsInput
                      query={query}
                      onChange={(event) => handleChangeKey(event, index)}
                      inputModifier="key"
                    />
                    <UrlFormerQueryParamsInput
                      query={query}
                      onChange={(event) => handleChangeValue(event, index)}
                      inputModifier="value"
                    />
                    <ActiveCheckbox
                      checked={query.isActive}
                      onChange={() => {
                        handleChangeIsActive(index);
                      }}
                    />
                    <UrlFormerQueryParamsDeleteQueryButton
                      onClick={handleDelate}
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
