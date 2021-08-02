import React from "react";
import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";
import Form from "../Form/Form";
import Login from "../Login/Login";
import Modal from "react-bootstrap/Modal";

export default function Menu({ userDetails, updateUserDetails}) {
  
  const menu = useRef();

  const path = useLocation().pathname;
  const [effective, seteffective] = useState(path);

  const [showForm, setshowForm] = useState(false);
  const openForm = () => setshowForm(true);
  const closeForm = () => setshowForm(false);

  const [showLogin, setshowLogin] = useState(false);
  const openLogin = () => setshowLogin(true);
  const closeLogin = () => setshowLogin(false);

  const [sticky, setsticky] = useState(false);
  window.onscroll = function () {
    scrollAndSticy();
  };

  function scrollAndSticy() {
    window.pageYOffset >= 200 ? setsticky(true) : setsticky(false);
  }

  function signOut() {
    let anyUser = {
      id: "",
      fullName: "",
      email: "",
      password: "",
      cart: [],
      sumItems: 0,
      sumPrice: 0,
    };
    updateUserDetails(anyUser);
    localStorage.setItem("currUserDetails", JSON.stringify(anyUser));
  }

  return (
    <div>
      {sticky && <div style={{ height: menu.current.offsetHeight }}></div>}

      <ul ref={menu} className={sticky ? "sticky" : ""}>
        <Modal show={showForm} onHide={closeForm} size="lg" centered="true">
          <Form updateUserDetails={updateUserDetails} closeForm={closeForm} />
        </Modal>
        <Modal show={showLogin} onHide={closeLogin} centered="true">
          <Login
            updateUserDetails={updateUserDetails}
            closeForm={closeLogin}
          />
        </Modal>
        <li>
          <Link
            to="/AdultBooks"
            onClick={() => seteffective("/AdultBooks")}
            className={effective === "/AdultBooks" ? "active" : "notActive"}
          >
            ספרי מבוגרים
          </Link>
        </li>
        <li>
          <Link
            to="/ChildrenBooks"
            onClick={() => seteffective("/ChildrenBooks")}
            className={effective === "/ChildrenBooks" ? "active" : "notActive"}
          >
            ספרי ילדים
          </Link>
        </li>
        <li>
          <Link
            to="/ComicsBooks"
            onClick={() => seteffective("/ComicsBooks")}
            className={effective === "/ComicsBooks" ? "active" : "notActive"}
          >
            ספרי קומיקס
          </Link>
        </li>
        <li>
          <Link
            to="/CookingBooks"
            onClick={() => seteffective("/CookingBooks")}
            className={effective === "/CookingBooks" ? "active" : "notActive"}
          >
            ספרי בישול
          </Link>
        </li>
        <li>
          <Link
            to="/Moosar"
            onClick={() => seteffective("/Moosar")}
            className={effective === "/Moosar" ? "active" : "notActive"}
          >
            מוסר
          </Link>
        </li>
        <li>
          <Link
            to="/Tora"
            onClick={() => seteffective("/Tora")}
            className={effective === "/Tora" ? "active" : "notActive"}
          >
            תורה
          </Link>
        </li>
        {/* user details */}
        {userDetails.fullName !== "" && (
          <li className="dropdown-r information-r">
            <a className="dropbtn-r" href="javascript:void(0)">
              <i className="fas fa-user"></i>
              <p className="p-information-r">{userDetails.fullName}</p>
            </a>
            <div
              className={
                sticky
                  ? "dropdown-content user-details information-sticky"
                  : "dropdown-content user-details"
              }
            >
              <p>{userDetails.fullName}</p>
              <p>{userDetails.id}</p>
              <p>{userDetails.email}</p>
              <button onClick={() => signOut()}>
                <i className="fas fa-sign-out-alt"></i>
                <p className="p-information-r">{" ליציאה מהחשבון"} </p>
              </button>
            </div>
          </li>
        )}
        {/* add user */}
        <li className="information-r">
          <a className="dropbtn-r" href="javascript:void(0)" onClick={openForm}>
            <i className="fas fa-user-plus"></i>
            <p className="p-information-r">להרשמה</p>
          </a>
        </li>
        {/* sign-in */}
        <li className="information-r">
          <a
            className="dropbtn-r"
            href="javascript:void(0)"
            onClick={openLogin}
          >
            <i className="fas fa-sign-in-alt"></i>
            <p className="p-information-r">לכניסה</p>
          </a>
        </li>
        {/* cart */}
        <li className="information-r">
          <Link to="Cart" onClick={() => seteffective("/Cart")} className={effective === "/Cart" ? "cart-active dropbtn-r" : "dropbtn-r"}>
            <i className="fas fa-shopping-cart icons"></i>
            {userDetails.sumItems !== 0 && (
              <div className="numberCircle">{userDetails.sumItems}</div>
            )}
            <p className="p-information-r">לסל</p>
          </Link>
        </li>
        {/* home */}
        <li className="information-r">
          <Link to="/" onClick={() => seteffective("/Home")} className={effective === "/Home" ? "cart-active dropbtn-r" : "dropbtn-r"}>
          <i className="fas fa-home"></i>
            <p className="p-information-r">לדף הבית</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
