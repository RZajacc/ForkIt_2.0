import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

type Props = {
  mobileNavState: string;
  toggleMobileNavState: () => void;
  logout: () => void;
};

function MobileNav({ mobileNavState, toggleMobileNavState, logout }: Props) {
  const { user } = useContext(AuthContext);

  return (
    <div className={mobileNavState}>
      <Link to={"recipes"} onClick={toggleMobileNavState}>
        <img
          src="/stove-svgrepo-com_white.svg"
          alt="opened door"
          className="mobile-nav-image"
        />
        Recipes
      </Link>

      <Link to={"contact"} onClick={toggleMobileNavState}>
        <img
          src="/contact-form-email-svgrepo-com_white.svg"
          alt="opened door"
          className="mobile-nav-image"
        />
        Contact
      </Link>

      {user ? (
        <>
          <Link to={"dashboard"} onClick={toggleMobileNavState}>
            <img
              src="/dashboard-stats-svgrepo-com_white.svg"
              alt="opened door"
              className="mobile-nav-image"
            />
            Dashboard
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to={"login"} onClick={toggleMobileNavState}>
          <img
            src="/account-avatar-man-svgrepo-com_white.svg"
            alt="opened door"
            className="mobile-nav-image"
          />
          Login
        </Link>
      )}
    </div>
  );
}

export default MobileNav;
