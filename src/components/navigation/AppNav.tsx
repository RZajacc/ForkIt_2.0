import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

import MobileNav from "./subcomponents/MobileNav";
import DesktopNav from "./subcomponents/DesktopNav";

import hungry from "/hungry.svg";
import "./appnav.scss";

function AppNav() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // ASSIGN MOBILE NAV STATE
  const [mobileNavState, setMobileNavState] = useState(
    "mobile-nav-items--hidden"
  );

  const toggleMobileNavState = () => {
    if (mobileNavState === "mobile-nav-items--hidden") {
      setMobileNavState("mobile-nav-items--active");
      setbackdropState("backdrop open");
    } else {
      setMobileNavState("mobile-nav-items--hidden");
      setbackdropState("backdrop");
    }
  };
  // BACKDROP STATE
  const [backdropState, setbackdropState] = useState("backdrop");

  // LOGOUT FUNCTIONALITY
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error: FirebaseError) => {
        console.log(error.code);
      });
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
            <img src={hungry} alt="forkit-logo" />
          </Link>
          {/* MOBILE NAV BUTTON*/}
          <button className="mobile-nav-button" onClick={toggleMobileNavState}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* DESKTOP NAV */}
          <DesktopNav logout={logout} />
        </nav>
        {/* MOBILE NAV DIV SECTION */}
        <MobileNav
          mobileNavState={mobileNavState}
          toggleMobileNavState={toggleMobileNavState}
          logout={logout}
        />
      </header>
      {/* BACKROP WHEN MOBILE OPTIONS ARE OPENED */}
      <div className={backdropState} onClick={toggleMobileNavState}></div>
    </>
  );
}

export default AppNav;
