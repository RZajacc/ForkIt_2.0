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

        <div className={mobileNavState}>
          <Link to={"recipes"}>Recipes</Link>
          <Link to={"contact"}>Contact</Link>
          {/* Here will be some logic for user */}
          <Link to={"account"}>Account</Link>
        </div>
        {/* <ul className="mobile-nav__items">
          <li className="mobile-nav_item">
            <Link to={"recipes"}>Recipes</Link>
          </li>
          <li className="mobile-nav_item">
            <Link to={"contact"}>Recipes</Link>
          </li>
          {/* Here will be some logic for user */}
        {/* <li className="mobile-nav_item">
            <Link to={"account"}>Account</Link>
          </li>
        </ul> */}
      </header>
    </>

    // <Navbar expand='sm' className='p-3'>
    //   <Container fluid>
    //     <LinkContainer to={'/'}>
    //       <Navbar.Brand>
    //         <img
    //           src='https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/hungry.svg?alt=media&token=a0bc267d-5ae9-42ba-b93e-9fc4d216eb51'
    //           width='40'
    //           height='40'
    //           className='d-inline-block align-top'
    //           alt='Forkit logo'
    //         />
    //         Forkit
    //       </Navbar.Brand>
    //     </LinkContainer>
    //     <Navbar.Toggle aria-controls='basic-navbar-nav' />
    //     <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
    //       <Nav>
    //         <LinkContainer to={'recipes'}>
    //           <NavLink>Recipes</NavLink>
    //         </LinkContainer>
    //         <LinkContainer to={'contact'}>
    //           <NavLink>Contact</NavLink>
    //         </LinkContainer>

    //         {user ? (
    //           <>
    //             <LinkContainer to={'dashboard'}>
    //               <NavLink>Dashboard</NavLink>
    //             </LinkContainer>
    //             <LinkContainer to={'account'}>
    //               <Button variant='danger' onClick={logout}>
    //                 <img src='https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/door-open-white.svg?alt=media&token=02cc62e2-e221-46ba-acfe-9ce5e156a510' alt='opened door' className='nav-button-image' />{' '}
    //                 Logout
    //               </Button>
    //             </LinkContainer>
    //           </>
    //         ) : (
    //           <LinkContainer to={'account'}>
    //             <NavLink>
    //               <img src='https://firebasestorage.googleapis.com/v0/b/forkit-d574f.appspot.com/o/account-50-black.png?alt=media&token=07ba0644-e81a-4f25-8166-a4d0d6c7a799' className='nav-button-image' /> Account
    //             </NavLink>
    //           </LinkContainer>
    //         )}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
}

export default AppNav;
