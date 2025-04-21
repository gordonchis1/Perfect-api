import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

function NavLink({ currentHeaderWidth, text, icon, to }) {
  return (
    <nav className="header-nav">
      <Link to={to} className="header-nav_a">
        <FontAwesomeIcon
          icon={icon}
          className="header-nav_icon"
          style={{
            width: currentHeaderWidth >= 200 ? "1.5rem" : "2rem",
            height: currentHeaderWidth >= 200 ? "1.5rem" : "2rem",
          }}
        />
        {currentHeaderWidth >= 200 && <span>{text}</span>}
      </Link>
    </nav>
  );
}

export default NavLink;
