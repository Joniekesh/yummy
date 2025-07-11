import { useEffect } from "react";
import getUser from "../utils/getUser";
import { useLocation, useNavigate } from "react-router-dom";

import { loadStripe, type Appearance } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Pay = () => {
  const user = getUser();
  const navigate = useNavigate();

  const {
    state: { client_secret },
  } = useLocation();

  useEffect(() => {
    !user && navigate("/auth");
  }, [user]);

  console.log(client_secret);

  const appearance: Appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div className="min-h-[100vh] flex items-center justify-center mt-10">
      {client_secret ? (
        <Elements
          options={{ clientSecret: client_secret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      ) : (
        <div className="text-gray-300 text-[36px] text-center">
          Loading checkout interface. Please wait...
        </div>
      )}
    </div>
  );
};

export default Pay;
