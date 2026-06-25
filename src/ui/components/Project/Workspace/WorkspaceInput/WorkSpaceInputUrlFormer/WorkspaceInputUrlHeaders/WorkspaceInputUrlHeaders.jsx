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
    const currentFileId = useProjectStore((store) => store.currentFileId);
    const content = useProjectStore(
        (store) => store.openFiles[currentFileId]?.content,
    );
    const updateContentOfOpenFile = useProjectStore(
        (store) => store.updateContentOfOpenFile,
    );
    const headers = content?.headers;
    const url = content.url.finalUrl;


    const onHeadersChange = (index, type, value) => {
        const updatedHeaders = [...headers];
        updatedHeaders[index][type] = value;

        updateContentOfOpenFile(currentFileId, {
            ...content,
            headers: updatedHeaders,
        });

    };

    useEffect(() => {
        if (headers.length > 0) {
            const hostIndex = headers.findIndex(element => {
                return element?.key == "Host"
            });
            if (hostIndex < 0) return
            let host = "";
            try {
                const urlObject = new URL(url);
                host = urlObject.host;
            } catch {
                host = ""
            }
            onHeadersChange(hostIndex, "value", host);
        }
    }, [url])

    const handleChangeIsActive = (index) => {
        const updatedHeaders = [...headers];
        updatedHeaders[index].isActive = !updatedHeaders[index].isActive;

        updateContentOfOpenFile(currentFileId, {
            ...content,
            headers: updatedHeaders,
        });

    };

    const handleAddHeader = () => {
        const updatedHeaders = [...headers, { key: "", value: "", isActive: true }];

        updateContentOfOpenFile(currentFileId, {
            ...content,
            headers: updatedHeaders,
        });

    };

    const handleDeleteHeader = (index) => {
        const updatedHeaders = [...headers];
        updatedHeaders.splice(index, 1);

        updateContentOfOpenFile(currentFileId, {
            ...content,
            headers: updatedHeaders,
        });

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
