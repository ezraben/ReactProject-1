import { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import navCss from "./navCss.css";

const NavBarComponent = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);

  const showLoggedIn = () => {
    if (userData.email && userData.biz === true) {
      return (
        <Fragment>
          <li className="nav-item">
            <NavLink className="nav-link isConnected" to="/">
              {userData.email} is connected
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/deshbord">
              Dashbord
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              about
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/createCard">
              createCard
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink className="nav-link logOut" to="/logOut">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              LogOut
            </NavLink>
          </li>
        </Fragment>
      );
    }
    if (userData.email && userData.biz === false) {
      return (
        <Fragment>
          <li className="nav-item">
            <NavLink className="nav-link isConnected " to="/">
              {userData.email} is connected
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              about
            </NavLink>
          </li>

          <li className="nav-item logOut ">
            <NavLink className="nav-link" to="/logOut">
              LogOut
            </NavLink>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/bizRegister">
              bizRegister
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About us
            </NavLink>
          </li>
        </Fragment>
      );
    }
  };
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top "   ${
        loggedIn ? "connected" : "notConected"
      } `}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" id="homeLink" to="/">
          <FontAwesomeIcon icon={faHouse} /> Home
        </NavLink>

        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav " id="ulItemsNaveBar">
            {showLoggedIn()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
