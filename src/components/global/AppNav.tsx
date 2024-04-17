import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, NavLink } from "react-router-dom";

import "../../style/navbar.scss";

function AppNav() {
  const { user, logout } = useContext(AuthContext);
  const [mobileNavState, setMobileNavState] = useState(
    "mobile-nav-items--hidden"
  );
  const [backdropState, setbackdropState] = useState("backdrop");

  const toggleMobileNavState = () => {
    if (mobileNavState === "mobile-nav-items--hidden") {
      setMobileNavState("mobile-nav-items--active");
      setbackdropState("backdrop open");
    } else {
      setMobileNavState("mobile-nav-items--hidden");
      setbackdropState("backdrop");
    }
  };
  return (
    <>
      <header>
        <nav className="nav-section">
          <Link
            to={"/"}
            className="header-brand"
            onClick={() => {
              setMobileNavState("mobile-nav-items--hidden");
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/hungry.svg?alt=media&token=a0bc267d-5ae9-42ba-b93e-9fc4d216eb51"
              alt="forkit-logo"
            />
          </Link>
          {/* MOBILE NAV BUTTON*/}
          <button className="mobile-nav-button" onClick={toggleMobileNavState}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* DESKTOP NAV */}
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
                  <NavLink to={"account"} onClick={logout}>
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
                <NavLink to={"account"}>
                  <img
                    src="/account-avatar-man-svgrepo-com_black.svg"
                    alt="opened door"
                    className="mobile-nav-image"
                  />
                  Account
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        {/* MOBILE NAV DIV SECTION */}
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
              <Link to={"account"} onClick={logout}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/door-open-white.svg?alt=media&token=02cc62e2-e221-46ba-acfe-9ce5e156a510"
                  alt="opened door"
                  className="mobile-nav-image"
                />
                Logout
              </Link>
            </>
          ) : (
            <Link to={"account"} onClick={toggleMobileNavState}>
              <img
                src="/account-avatar-man-svgrepo-com_white.svg"
                alt="opened door"
                className="mobile-nav-image"
              />
              Account
            </Link>
          )}
        </div>
      </header>
      {/* BACKROP WHEN MOBILE OPTIONS ARE OPENED */}
      <div className={backdropState} onClick={toggleMobileNavState}></div>
    </>
  );
}

export default AppNav;
