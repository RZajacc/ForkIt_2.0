import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MobileNav from "./subcomponents/MobileNav";
import DesktopNav from "./subcomponents/DesktopNav";

import "./appnav.scss";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { FirebaseError } from "firebase/app";

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
