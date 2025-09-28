import logoLigth from "../../assets/logo-dark.webp";
import HeaderNav from "./HeaderNav";
import "./Header.css";
import { useEffect, useRef, useState } from "react";
import useWidthObserver from "../../Hooks/useWidthObserver";
import HeaderSettingsButton from "./HeaderSettingsButton/HeaderSettingsButton";

function Header() {
  const containerHeader = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // TODO: cambiar esto dentro del hook useWidthObserver
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentHeaderWidth = useWidthObserver({
    ref: isMounted ? containerHeader : { current: null },
  });

  return (
    <div className="container-header" ref={containerHeader}>
      <div className="header-logo">
        <img src={logoLigth} alt="Logo" />
        {currentHeaderWidth >= 250 && <h1>Perfect-api</h1>}
      </div>
      <HeaderNav currentHeaderWidth={currentHeaderWidth} />
      <div className="header-config_container">
        <HeaderSettingsButton currentHeaderWidth={currentHeaderWidth} />
      </div>
    </div>
  );
}

export default Header;
