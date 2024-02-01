import { lazy } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Mnpp7KxtaBuVe3auzx9LipLvztHYu3hipUfm31VV80jizwnXubYK4SN6fTiV9Ne0FRVqzIbL6kZ3mSGZ0t2by6O00ZnkhmHP5"
);

const CartList = lazy(() => import("./components/CartList"));
const BuyPhotos = lazy(() => import("../../../components/BuyPhotos"));

function Cart() {
  return (
    <div className=" md:flex md:justify-center mt-16">
      <Elements stripe={stripePromise}>
        <BuyPhotos />
        <CartList />
      </Elements>
    </div>
  );
}

export default Cart;
