import { useParams } from "react-router";
import useFileManagerContext from "../../../../../Hooks/FileManager/useFileMangerContext";
import { FILEMANAGER_REDUCER_ACTIONS } from "../../../../../providers/FileManager/reducer";

export default function FileManagerDraggableElement({
  children,
  node,
  FilemanagerElementContainerRef,
  draggin,
  setDraggin,
  ...props
}) {
  const { id } = useParams();
  const [state, dispatch] = useFileManagerContext();
  const absolutePath = state.getAbsolutePath(node);

  const handleOnMouseDown = (event) => {
    const originalWidth = FilemanagerElementContainerRef.current.clientWidth;
    if (node.name === "/") return;
    const { clientX: startX, clientY: startY } = event;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const diffX = Math.abs(clientX - startX);
      const diffY = Math.abs(clientY - startY);
      if (!draggin && (diffX > 5 || diffY > 5)) {
        setDraggin(true);
        FilemanagerElementContainerRef.current.style.left = `${clientX}px`;
        FilemanagerElementContainerRef.current.style.top = `${clientY}px`;
        FilemanagerElementContainerRef.current.style.minWidth = `${originalWidth}px`;
        FilemanagerElementContainerRef.current.addEventListener(
          "click",
          handlePreventClick,
          true
        );

        const elementBelow = document.elementsFromPoint(clientX, clientY);

        const filemanagerElementContainerBelow = elementBelow.filter((el) =>
          el.classList.contains("filemanager-element-container")
        );

        if (filemanagerElementContainerBelow[1]) {
          if (
            !filemanagerElementContainerBelow[1].classList.contains(
              "hover-drag-and-drop"
            )
          ) {
            document
              .querySelectorAll(".hover-drag-and-drop")
              .forEach((el) => el.classList.remove("hover-drag-and-drop"));

            filemanagerElementContainerBelow[1].classList.add(
              "hover-drag-and-drop"
            );
          }
        }
      }
    };

    const handlePreventClick = (event) => {
      event.stopImmediatePropagation();
      event.preventDefault();
      FilemanagerElementContainerRef.current.removeEventListener(
        "click",
        handlePreventClick,
        true
      );
    };

    const handleMouseUp = (event) => {
      setDraggin(false);
      const { clientX, clientY } = event;
      const diffX = Math.abs(clientX - startX);
      const diffY = Math.abs(clientY - startY);

      const elementBelow = document.elementsFromPoint(clientX, clientY);

      const filemanagerElementContainerBelow = elementBelow.filter((el) =>
        el.classList.contains("filemanager-element-container")
      );

      const path = filemanagerElementContainerBelow[1]?.getAttribute("path");

      if (path && (diffX > 5 || diffY > 5)) {
        dispatch({
          type: FILEMANAGER_REDUCER_ACTIONS.move,
          payload: { moveElement: absolutePath, to: path, type: node.type },
        });
      }

      document
        .querySelectorAll(".hover-drag-and-drop")
        .forEach((el) => el.classList.remove("hover-drag-and-drop"));
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="filemanager-element"
      onMouseDown={handleOnMouseDown}
      {...props}
    >
      {children}
    </div>
  );
}
