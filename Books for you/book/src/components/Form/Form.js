import React, { useEffect, useState } from "react";
import { addUser } from './../../service/getAndSetData'
import { isIsraeliID, isValidMail, validateForm } from './../../shared/validation'
import "./Form.css";

export default function Form({ updateUserDetails, closeForm }) {
  const [fullName, setfullName] = useState("");
  const [id, setid] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState({
    fullName: " ",
    id: " ",
    email: " ",
    password: " ",
  });
  const [submit, setSubmit] = useState(false);

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "fullName":
        let nameError =
          value.length === 0
            ? "this filed requierd"
            : value.length < 5
              ? "Full Name must be at least 5 characters long!"
              : "";
        seterrors((prevErrors) => ({
          ...prevErrors,
          fullName: nameError,
        }));
        setfullName(value);
        break;
      case "id":
        let idError =
          value.length === 0
            ? "this filed requierd"
            : isIsraeliID(value)
              ? ""
              : "id is not valid!";
        seterrors((prevErrors) => ({
          ...prevErrors,
          id: idError,
        }));
        setid(value);
        break;
      case "email":
        let emailError =
          value.length === 0
            ? "this filed requierd"
            : isValidMail(value)
              ? "Email is not valid!"
              : "";
        seterrors((prevErrors) => ({
          ...prevErrors,
          email: emailError,
        }));
        setemail(value);
        break;
      case "password":
        let passwordError =
          value.length === 0
            ? "this filed requierd"
            : value.length < 8
              ? "Password must be at least 8 characters long!"
              : "";
        seterrors((prevErrors) => ({
          ...prevErrors,
          password: passwordError,
        }));
        setpassword(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.length === 0) {
      seterrors((prevErrors) => ({
        ...prevErrors,
        email: "this filed requierd",
      }));
    }
    if (id.length === 0) {
      seterrors((prevErrors) => ({ ...prevErrors, id: "this filed requierd" }));
    }
    if (fullName.length === 0) {
      seterrors((prevErrors) => ({
        ...prevErrors,
        fullName: "this filed requierd",
      }));
    }
    if (password.length === 0) {
      seterrors((prevErrors) => ({
        ...prevErrors,
        password: "this filed requierd",
      }));
    }
    if (validateForm(errors)) {
      setSubmit(true);
    }
  };

  useEffect(async () => {
    if (submit) {
      const newUser = {
        id: id,
        fullName: fullName,
        email: email,
        password: password,
        cart: [],
        sumItems: 0,
        sumPrice: 0,
      };
      let response = await addUser(newUser);
      let response2 = await response.text();
      if (response2 == 'ok') {
        localStorage.setItem("currUserDetails", JSON.stringify(newUser));
        updateUserDetails(newUser);
        setemail("");
        setfullName("");
        setpassword("");
        setid("");
        setSubmit(false);
        closeForm();
      }
      else{
        alert("massage from server: " +response2);
        setSubmit(false);
      }
    }
  }, [submit]);

  return (
    <div className="wrapper-r">
      <div className="form-wrapper">
        <h2>יצירת חשבון</h2>

        <form noValidate>
          <div className="fullName">
            <label htmlFor="fullName">שם מלא</label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
              noValidate
            />
            {errors.fullName.length > 0 && (
              <span className="error">{errors.fullName}</span>
            )}
          </div>
          <div className="id">
            <label htmlFor="id">תעודת זהות</label>
            <input type="text" name="id" value={id} onChange={handleChange} />
            {errors.id.length > 0 && <span className="error">{errors.id}</span>}
          </div>
          <div className="email">
            <label htmlFor="email">דוא"ל</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              noValidate
            />
            {errors.email.length > 0 && (
              <span className="error" value={errors.email}>
                {errors.email}
              </span>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">סיסמא</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              noValidate
            />
            {errors.password.length > 0 && (
              <span className="error" value={password}>
                {errors.password}
              </span>
            )}
          </div>
          <div className="submit">
            <button onClick={handleSubmit}>צור</button>
          </div>
        </form>
      </div>
    </div>
  );
}
