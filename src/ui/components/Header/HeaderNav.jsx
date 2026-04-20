import NavLink from "./NavLink";

function HeaderNav({ currentHeaderWidth }) {
  return (
    <nav className="header-nav">
      <NavLink
        currentHeaderWidth={currentHeaderWidth}
        text={"Proyectos"}
        to={"/"}
      />
    </nav>
  );
}

export default HeaderNav;
