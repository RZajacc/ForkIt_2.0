import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

// Images
import stoveWhite from "/stove-svgrepo-com_white.svg";
import contactFormWhite from "/contact-form-email-svgrepo-com_white.svg";
import dashboardStatsWhite from "/dashboard-stats-svgrepo-com_white.svg";
import avatarWhite from "/account-avatar-man-svgrepo-com_white.svg";
import registerWhite from "/register-svgrepo-com_white.svg";

type Props = {
  mobileNavState: string;
  toggleMobileNavState: () => void;
  logout: () => void;
};

function MobileNav({ mobileNavState, toggleMobileNavState, logout }: Props) {
  const { user } = useContext(AuthContext);

  return (
    <div className={mobileNavState}>
      {user ? (
        <>
          <Link to={"dashboard"} onClick={toggleMobileNavState}>
            <img
              src={dashboardStatsWhite}
              alt="dashboard-icon"
              className="mobile-nav-image"
            />
            Account
          </Link>

          <Link to={"recipes"} onClick={toggleMobileNavState}>
            <img
              src={stoveWhite}
              alt="stove-icon"
              className="mobile-nav-image"
            />
            Recipes
          </Link>

          <Link to={"contact"} onClick={toggleMobileNavState}>
            <img
              src={contactFormWhite}
              alt="contact-form-icon"
              className="mobile-nav-image"
            />
            Contact
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to={"login"} onClick={toggleMobileNavState}>
            <img
              src={avatarWhite}
              alt="avatar-icon"
              className="mobile-nav-image"
            />
            Login
          </Link>
          <Link to={"register"} onClick={toggleMobileNavState}>
            <img
              src={registerWhite}
              alt="avatar-icon"
              className="mobile-nav-image"
            />
            Register
          </Link>

          <Link to={"recipes"} onClick={toggleMobileNavState}>
            <img
              src={stoveWhite}
              alt="stove-icon"
              className="mobile-nav-image"
            />
            Recipes
          </Link>

          <Link to={"contact"} onClick={toggleMobileNavState}>
            <img
              src={contactFormWhite}
              alt="contact-form-icon"
              className="mobile-nav-image"
            />
            Contact
          </Link>
        </>
      )}
    </div>
  );
}

export default MobileNav;
