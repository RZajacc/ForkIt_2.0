import { useState } from "react";
import { Link } from "react-router-dom";

import MobileNav from "./subcomponents/MobileNav";
import DesktopNav from "./subcomponents/DesktopNav";

import "./appnav.scss";

function AppNav() {
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
  const [backdropState, setbackdropState] = useState("backdrop");

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
          <DesktopNav />
        </nav>
        {/* MOBILE NAV DIV SECTION */}
        <MobileNav
          mobileNavState={mobileNavState}
          toggleMobileNavState={toggleMobileNavState}
        />
      </header>
      {/* BACKROP WHEN MOBILE OPTIONS ARE OPENED */}
      <div className={backdropState} onClick={toggleMobileNavState}></div>
    </>
  );
}

export default AppNav;
