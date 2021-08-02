import React, { useEffect, useState } from "react";
import { getCart } from './../../service/getAndSetData.js'
import CartBook from "../CartBook/CartBook";

import "./Cart.css";
export default function Cart({ userDetails, updateUserDetails, setloading }) {
  const [cart, setcart] = useState([])

  useEffect(async () => {
    setloading(true)
    await setcart(await getCart(userDetails.id))
    setloading(false)
  }, [userDetails.cart])
  return (
    <div className="cart-container-r">
      {userDetails.sumPrice !== 0 &&
        <div>
          <div className="info">
            <h4 dir='rtl'>סה"כ לתשלום:</h4>
            <h3 dir='rtl'>{userDetails.sumPrice} ש"ח</h3>
            <div className="forPay"><b>{"התשלום במזומן בעת קבלת המוצר"}</b></div>
          </div>
          <div className="cart-grid">
            {
              cart.map((item) => (
                <CartBook
                  itemDetails={item}
                  updateUserDetails={updateUserDetails}
                  userDetails={userDetails}
                  setloading={setloading}
                />
              ))}
          </div>
        </div>}

      {userDetails.sumPrice === 0 &&
        <div className="empty-cart-r">
          <h1 dir='rtl'>בנתיים עוד אין לך ספרים בסל...</h1>
        </div>
      }

    </div>
  );
}
