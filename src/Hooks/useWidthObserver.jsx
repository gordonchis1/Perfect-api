import { useState, useEffect } from "react";

export default function useWidthObserver({ ref }) {
  const [width, setWidth] = useState(undefined);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entrie of entries) {
        const { width } = entrie.contentRect;
        setWidth(width);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return width;
}
