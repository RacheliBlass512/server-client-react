import React from "react";
import { deleteAllInstancesProductToUser } from './../../service/getAndSetData';
import "./CartBook.css";
export default function CartBook({
  userDetails,
  updateUserDetails,
  itemDetails,
  setloading
}) {
  const deleteItem = async() => {
    setloading(true)
    let response = await deleteAllInstancesProductToUser({
      id: userDetails.id,
      elementToDelete: itemDetails
    });
    let response2 = await response.text()
    if (response2) {
      let cart = userDetails["cart"];
      let filteredCart = cart.filter((item) => item.id !== itemDetails.id);
      updateUserDetails({
        ...userDetails,
        cart: filteredCart,
        sumItems: userDetails.sumItems - itemDetails.sum,
        sumPrice: userDetails.sumPrice - itemDetails.price * itemDetails.sum
      });
      localStorage.setItem("currUserDetails", JSON.stringify(userDetails));
    }
    setloading(false)
  };

  let image = require("./../../assets/images/" + itemDetails.picture);
  return (
    <div className='item'>
      <div className="img-txt">
        <div className="num">-{itemDetails.sum}-</div>
        <img src={image.default} alt="img" />
        <p>
          {itemDetails.name} | {itemDetails.author}
        </p>
      </div>
      <p dir="rtl">
        <b>{itemDetails.price} ש"ח</b>
      </p>
      <button onClick={() => deleteItem()}>הסר מהסל</button>
    </div>
  );
}
