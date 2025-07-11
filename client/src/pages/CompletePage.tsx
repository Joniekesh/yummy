import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "../redux/reducers/cartReducers";
import { useAppDispatch } from "../redux/hooks";
import getUser from "../utils/getUser";
import makeRequest from "../utils/makeRequest";
import "../App.css";

const CompletePage = () => {
  const [loading, setLoading] = useState(false);
  const user = getUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const hasRun = useRef(false); // Prevent multiple runs

  useEffect(() => {
    if (hasRun.current) return;

    const paymentIntent = new URLSearchParams(window.location.search).get(
      "payment_intent"
    );

    if (!paymentIntent) {
      toast.error("Missing payment reference");
      navigate("/cart");
      return;
    }

    hasRun.current = true; // Mark as run

    const updateOrder = async () => {
      setLoading(true);
      try {
        const res: any = await makeRequest.put(
          `/orders/confirm/${paymentIntent}`
        );

        if (res.status === 200) {
          toast.success(res.data);
          dispatch(clearCart());
          navigate(`/${user.role}`);
        }
      } catch (error: any) {
        toast.error(error?.response?.data || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    updateOrder();
  }, [navigate, dispatch, user.role]);

  return (
    loading && (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <p className="text-lg text-gray-700">Finalizing your payment...</p>
      </div>
    )
  );
};

export default CompletePage;
