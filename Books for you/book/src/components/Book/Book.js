import React, { useEffect, useState } from "react";
import "./Book.css";
import { addProductToUser, deleteOneProductToUser, deleteAllInstancesProductToUser } from "./../../service/getAndSetData";

export default function Book({ itemDetails, userDetails, updateUserDetails, seterrorOccurred, setloading ,loading}) {
  const [num, setnum] = useState(0);

  const getSum = () => {
    //check if this item in the cart yet if so update numInCart
    let result = 0
    userDetails.cart.map((item) => {
      if (item.id === itemDetails.id) {
        result = item.sum
      }
    });
    return result
  };

  const saveDetails = async (detailsToUpdate) => {
    updateUserDetails(detailsToUpdate)
    localStorage.setItem("currUserDetails", JSON.stringify(detailsToUpdate));
  }

  useEffect(() => {
    setnum(getSum())
  }, [userDetails.fullName])
  const add = async () => {
    if (userDetails.id === "") {
      seterrorOccurred((val) => val + 1);
    }
    else {
      setloading(true)
      let response = await addProductToUser({
        id: userDetails.id,
        elementToAdd: { ...itemDetails, sum: 1 }
      })
      let response2 = await response.text()
      if (response2 == 'ok') {
        setnum(val => val + 1)
        saveDetails({
          ...userDetails,
          cart: [...userDetails.cart, { ...itemDetails, sum: 1 }],
          sumItems: userDetails.sumItems + 1,
          sumPrice: userDetails.sumPrice + itemDetails.price
        })
      }
      else {
        alert("message from server: " + response2)
      }
      setloading(false)
    }
  }

  const plus = async () => {
    setloading(true)
    let response = await addProductToUser({
      id: userDetails.id,
      elementToAdd: itemDetails
    })
    let response2 = await response.text()
    if (response2 == 'ok') {
      setnum(val => val + 1)
      let tempCart = userDetails.cart;
      tempCart.forEach((item) => {
        if (item.id === itemDetails.id) {
          item.sum += 1;
        }
      });
      saveDetails({
        ...userDetails,
        cart: tempCart,
        sumItems: userDetails.sumItems + 1,
        sumPrice: userDetails.sumPrice + itemDetails.price
      })
    }
    else {
      alert("message from server: " + response2)
    }
    setloading(false)
  }

  const minus = async () => {
    let tempCart = userDetails.cart;
    let response;
    setloading(true)
    if (num === 1) {
      response = await deleteAllInstancesProductToUser({
        id: userDetails.id,
        elementToDelete: itemDetails
      })
      tempCart = tempCart.filter((item) => item.id !== itemDetails.id);
    }
    else {
      response = await deleteOneProductToUser({
        id: userDetails.id,
        elementToDelete: itemDetails
      })
      tempCart.forEach((item) => {
        if (item.id === itemDetails.id) {
          item.sum -= 1;
        }
      });
    }
    let response2 = await response.text()
    if (response2 == 'ok') {
      setnum(val => val - 1)
      saveDetails({
        ...userDetails,
        cart: tempCart,
        sumItems: userDetails.sumItems - 1,
        sumPrice: userDetails.sumPrice - itemDetails.price
      })
    }
    else {
      alert("message from server: " + response2)
    }
    setloading(false)
  }

  let image = require("./../../assets/images/" + itemDetails.picture);

  return (
    <div className="item">
      <div className="img-num-r">
        <img src={image.default} alt="img" />
      </div>
      <p>
        {itemDetails.name} | {itemDetails.author}
      </p>
      <p dir="rtl">
        <b>{itemDetails.price} ש"ח</b>
      </p>
      {num === 0 && (
        <button className="cart-btn" onClick={() => { add() }} disabled={loading}>
          <div>
            <i className="fas fa-shopping-cart"></i>
            <p>הוספה לסל</p>
          </div>
        </button>
      )}
      {num > 0 && (
        <div>
          <div className="row">
            <div className="col-md">
              <button className="addIncriseBtn" onClick={async () => await plus()} disabled={loading}>+</button>
            </div>
            <div className="col-md">
              <p className="myp">{num}</p>
            </div>
            <div className="col-md">
              <button className="addIncriseBtn" onClick={() => minus()} disabled={loading}>-</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
