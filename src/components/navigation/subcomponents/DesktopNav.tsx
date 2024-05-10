import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

// Images
import stoveBlack from "/stove-svgrepo-com_black.svg";
import contactFormBlack from "/contact-form-email-svgrepo-com_black.svg";
import avatarBlack from "/account-avatar-man-svgrepo-com_black.svg";
import dashboardBlack from "/dashboard-stats-svgrepo-com_black.svg";
import registerBlack from "/register-svgrepo-com_black.svg";

type Props = {
  logout: () => void;
};

function DesktopNav({ logout }: Props) {
  const { user } = useContext(AuthContext);
  return (
    <ul className="desktop-nav">
      <li>
        <NavLink to={"recipes"}>
          <img src={stoveBlack} alt="stove-icon" className="mobile-nav-image" />
          Recipes
        </NavLink>
      </li>
      <li>
        <NavLink to={"contact"}>
          <img
            src={contactFormBlack}
            alt="contact-form-icon"
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
                src={dashboardBlack}
                alt="dashboard-icon"
                className="mobile-nav-image"
              />
              Account
            </NavLink>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to={"register"}>
              <img
                src={registerBlack}
                alt="avatar-icon"
                className="mobile-nav-image"
              />
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to={"login"}>
              <img
                src={avatarBlack}
                alt="avatar-icon"
                className="mobile-nav-image"
              />
              Login
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default DesktopNav;
