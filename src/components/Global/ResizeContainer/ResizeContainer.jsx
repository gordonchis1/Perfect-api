import { cloneElement, forwardRef, useRef } from "react";
import "./resizecontainer.css";
import { Children, useEffect } from "react";

// ! Arreglar bug de resize handler
// TODO: Agregar la opcion de esconder el contenido
function ResizeContainer({
  children,
  resizeColor,
  defaultWidth,
  minWidthOfLeftContainer,
  maxWidthOfLeftContainer,
  containerWidth,
}) {
  const container = useRef(null);
  const reziseHandler = useRef(null);
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);

  const handleReziseHandler = () => {
    const handler = reziseHandler.current;
    const containerDiv = container.current;

    const drag = (event) => {
      const diff = container.current.getBoundingClientRect().left;
      const diffPct = (diff / window.innerWidth) * 100;

      const leftPosition = (100 * event.pageX) / containerWidth;
      const rightPosition = 100 - leftPosition;
      const maxLeft = (containerWidth * maxWidthOfLeftContainer) / 100;

      handler.style.left = `min(max(${minWidthOfLeftContainer + diff}px, ${
        leftPosition + diffPct
      }%), ${maxLeft + diff}px)`;

      containerDiv.style.gridTemplateColumns = `minmax(${minWidthOfLeftContainer}px, ${leftPosition}%) minmax(${
        100 - maxWidthOfLeftContainer
      }%,${rightPosition}%)`;
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stopDrag);
      const diff = window.innerWidth - containerWidth;
      reziseHandler.current.style.left = `${
        leftContainerRef.current.offsetWidth + diff
      }px`;
    };
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
  };

  useEffect(() => {
    if (reziseHandler.current) {
      const diff = container.current.getBoundingClientRect().left;
      reziseHandler.current.style.left = `${
        leftContainerRef.current.offsetWidth + diff
      }px`;
    }
  }, [containerWidth]);

  useEffect(() => {
    if (leftContainerRef.current) {
      let changeHolderPositonOnResize = () => {
        const diff = container.current.getBoundingClientRect().left;
        reziseHandler.current.style.left = `${
          leftContainerRef.current.offsetWidth + diff
        }px`;
        reziseHandler.current.style.height = `${container.current.offsetHeight}px`;
      };

      let onResize = () => {
        changeHolderPositonOnResize();
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", changeHolderPositonOnResize);
      };
    }
  }, [leftContainerRef]);

  useEffect(() => {
    if (container.current) {
      const rightDefaultWidth = 100 - defaultWidth;
      container.current.style.gridTemplateColumns = `${defaultWidth}% ${rightDefaultWidth}%`;
    }
    if (reziseHandler.current) {
      const diff = container.current.getBoundingClientRect().left;

      reziseHandler.current.style.left = `${
        leftContainerRef.current.offsetWidth + diff
      }px`;

      reziseHandler.current.style.height = `${container.current.offsetHeight}px`;
    }
  }, [container, defaultWidth, reziseHandler]);

  if (Children.count(children) > 2) {
    console.error("You can only have two childrens");
    return;
  }

  const clonedChildrens = children.map((child, index) => {
    const ref = index === 0 ? leftContainerRef : rightContainerRef;

    return cloneElement(child, { ref });
  });

  return (
    <div className="container" ref={container}>
      {clonedChildrens[0]}
      <div
        style={{ backgroundColor: resizeColor }}
        className="rezise-handler"
        ref={reziseHandler}
        onMouseDown={handleReziseHandler}
      ></div>
      {clonedChildrens[1]}
    </div>
  );
}

const RightContainer = forwardRef(({ children, className }, ref) => {
  return (
    <div
      style={{ width: "100%", height: "100%", maxHeight: "100%" }}
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
});

ResizeContainer.RightContainer = RightContainer;

const LeftContainer = forwardRef(({ children, className }, ref) => {
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", maxHeight: "100%" }}
      ref={ref}
    >
      {children}
    </div>
  );
});

ResizeContainer.LeftContainer = LeftContainer;

export default ResizeContainer;
