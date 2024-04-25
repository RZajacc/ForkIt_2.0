import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function DesktopNav() {
  const { user, logout } = useContext(AuthContext);
  return (
    <ul className="desktop-nav">
      <li>
        <NavLink to={"recipes"}>
          <img
            src="/stove-svgrepo-com_black.svg"
            alt="opened door"
            className="mobile-nav-image"
          />
          Recipes
        </NavLink>
      </li>
      <li>
        <NavLink to={"contact"}>
          <img
            src="/contact-form-email-svgrepo-com_black.svg"
            alt="opened door"
            className="mobile-nav-image"
          />
          Contact
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to={"dashboard"}>
              <img
                src="/dashboard-stats-svgrepo-com_black.svg"
                alt="opened door"
                className="mobile-nav-image"
              />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"login"} onClick={logout}>
              <img
                src="/door-open-svgrepo-com_black.svg"
                alt="opened door"
                className="mobile-nav-image"
              />
              Logout
            </NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink to={"login"}>
            <img
              src="/account-avatar-man-svgrepo-com_black.svg"
              alt="opened door"
              className="mobile-nav-image"
            />
            Login
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default DesktopNav;
