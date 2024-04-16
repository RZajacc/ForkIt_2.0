import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import "../../style/navbar.scss";

function AppNav() {
  const { user, logout } = useContext(AuthContext);
  const [mobileNavState, setMobileNavState] = useState(
    "mobile-nav-items--hidden"
  );

  const toggleMobileNavState = () => {
    if (mobileNavState === "mobile-nav-items--hidden") {
      setMobileNavState("mobile-nav-items--active");
    } else {
      setMobileNavState("mobile-nav-items--hidden");
    }
  };
  return (
    <>
      <header>
        <nav className="nav-section">
          <Link to={"/"} className="header-brand">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/hungry.svg?alt=media&token=a0bc267d-5ae9-42ba-b93e-9fc4d216eb51"
              alt="forkit-logo"
            />
          </Link>
          {/* MOBILE NAV */}
          <button className="mobile-nav-button" onClick={toggleMobileNavState}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>
      <div className={mobileNavState}>
        <Link to={"recipes"}>Recipes</Link>
        <Link to={"contact"}>Contact</Link>
        {/* Here will be some logic for user */}

        {user ? (
          <>
            <Link to={"dashboard"}>Dashboard</Link>
            <Link to={"account"} onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <Link to={"account"}>Account</Link>
        )}
      </div>
    </>

    //                 <img src='https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/door-open-white.svg?alt=media&token=02cc62e2-e221-46ba-acfe-9ce5e156a510' alt='opened door' className='nav-button-image' />{' '}
    //                 Logout
    //               <img src='https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/account-50-black.png?alt=media&token=07ba0644-e81a-4f25-8166-a4d0d6c7a799' className='nav-button-image' /> Account
  );
}

export default AppNav;
