import { faFile } from "@fortawesome/free-solid-svg-icons";
import NavLink from "./NavLink";

function HeaderNav({ currentHeaderWidth }) {
  return (
    <nav className="header-nav">
      <NavLink
        currentHeaderWidth={currentHeaderWidth}
        icon={faFile}
        text={"Proyectos"}
        to={"/"}
      />
    </nav>
  );
}

export default HeaderNav;
