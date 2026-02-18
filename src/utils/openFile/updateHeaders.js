import { useProjectStore } from "../../stores/ProjectStore";

// ! Input: array of headers
// ? if a header already exist rewrite
export default function updateHeaders(newHeaders) {
  const { openFiles, currentFileId, updateContentOfOpenFile } =
    useProjectStore.getState();
  const content = openFiles[currentFileId].content;

  const headers = content.headers;

  const updatedHeaders = [...headers];

  for (let header of newHeaders) {
    let idx = updatedHeaders.findIndex((element) => element.key == header.key);
    if (idx != -1) {
      updatedHeaders[idx] = header;
    } else {
      updatedHeaders.push(header);
    }
  }

  updateContentOfOpenFile(currentFileId, {
    ...content,
    headers: updatedHeaders,
  });
}
