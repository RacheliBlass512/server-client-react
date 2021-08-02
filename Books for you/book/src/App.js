import React, {useState } from "react";
import "./App.css";
import RouteComponent from "./components/RouteComponent/RouteComponent.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [userDetails, setuserDetails] = useState(
    localStorage.currUserDetails === undefined
      ? {
        id: "",
        fullName: "",
        email: "",
        password: "",
        cart: [],
        sumItems: 0,
        sumPrice: 0,
      }
      : JSON.parse(localStorage.getItem("currUserDetails"))
  );
  const f1 = (details) => {
    setuserDetails(details);
  };

  return (
    <div className="App">
      <RouteComponent
        userDetails={userDetails}
        updateUserDetails={f1}
      />
    </div>
  );
}

export default App;
