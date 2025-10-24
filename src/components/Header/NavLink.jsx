import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

function NavLink({ currentHeaderWidth, text, icon, to }) {
  return (
    <nav
      className="header-nav"
      style={{
        padding: currentHeaderWidth >= 150 ? "0px 10px 10px 20px" : "10px 10px",
      }}
    >
      <Link
        to={to}
        style={{
          padding: currentHeaderWidth >= 150 ? "10px 10px 10px 20px" : "10px 0",
          justifyContent: currentHeaderWidth >= 150 ? "flex-start" : "center",
        }}
        className="header-nav_a"
      >
        <FontAwesomeIcon
          icon={icon}
          className="header-nav_icon"
          style={{
            fontSize: currentHeaderWidth >= 150 ? "18px" : "25px",
          }}
        />
        {currentHeaderWidth >= 150 && <span>{text}</span>}
      </Link>
    </nav>
  );
}

export default NavLink;
