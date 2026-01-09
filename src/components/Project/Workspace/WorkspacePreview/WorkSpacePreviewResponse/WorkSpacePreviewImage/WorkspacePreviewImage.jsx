import useCurrentEntry from "../../../../../../Hooks/useCurrentEntry";
import "./WorkspacePreviewImage.css";

export default function WorkSpacePreviewImage() {
  const currentEntry = useCurrentEntry();

  return (
    <>
      {currentEntry?.response?.body?.raw && (
        <div className="workspace-preview_image-container">
          <img
            src={`data:image/png;base64,${currentEntry?.response?.body?.raw}`}
          ></img>
        </div>
      )}
    </>
  );
}
