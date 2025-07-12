import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { clearCart, removeFromToCart } from "../redux/reducers/cartReducers";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import makeRequest from "../utils/makeRequest";
import { useState } from "react";

interface Props {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart = ({ setOpenCart }: Props) => {
  const [loading, setLoading] = useState(false);

  const { products, quantity, totalPrice } = useAppSelector(
    (state) => state.cart
  );

  const auth = useAppSelector((state) => state.auth);
  const user = auth?.user;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate("/auth");
    } else {
      setLoading(true);
      try {
        const res: any = await makeRequest.post("/orders", {
          products,
          quantity,
          totalPrice,
        });

        console.log(res);

        if (res.status === 201) {
          navigate(`/pay/${res.data.order._id}`, {
            state: { client_secret: res.data.clientSecret },
          });
        }
        setLoading(false);
      } catch (error: any) {
        toast.error(error?.response?.data);
        console.log(error);
        setLoading(false);
      }
    }
    setOpenCart((prev) => !prev);
  };

  return (
    <div className="absolute flex flex-col gap-2 right-0 top-15 h-[90vh] overflow-y-auto w-[90vw] sm:w-[50vw] bg-white p-[10px] shadow-md text-base">
      <div>
        {products.length < 1 ? (
          <div className="flex items-center justify-center flex-col gap-10 opacity-[0.5]">
            <span className="text-[30px]">Cart is empty</span>
            <FaCartPlus className="w-[50px] h-[50px]" />
            <div
              className="cursor-pointer text-green-500"
              onClick={() => {
                setOpenCart((prev) => !prev);
                navigate("/foods");
              }}
            >
              Go To Shop
            </div>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-2 items-center my-[20px] w-full gap-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-[50px] h-[50px]">
                  <img
                    className="w-[100%] h-[100%] rounded-full object-fit"
                    src={product.image}
                    alt=""
                  />
                </div>

                <div>{product.name}</div>
              </div>
              <div className="flex items-center justify-between mr-0">
                <span>{product.qty}</span>x
                <span className="text-red-400">
                  ${product.price.toFixed(2)}
                </span>
                <IoIosCloseCircleOutline
                  className="cursor-pointer text-[24px] text-red-600"
                  onClick={() => {
                    dispatch(removeFromToCart(product._id));
                    toast.success("Cart item removed.");
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col gap-5 bg-red-50 p-[10px] rounded-[5px]">
        <div className="flex items-center justify-between text-red-500">
          <span>Subtotal ({quantity} Items)</span>
          <span className="text-red-500 text-[20px] font-[500]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between text-red-500">
          <span>Service Cost</span>
          <span className="text-[20px] font-[500]">$0.00</span>
        </div>
        <div className="flex items-center justify-between text-red-500">
          <span>Delivery Cost</span>
          <span className="uppercase text-green-500">free</span>
        </div>
        {products.length > 0 && (
          <div className="flex items-center justify-between">
            <div
              onClick={() => {
                dispatch(clearCart());
                toast.success("Cart items cleared.");
                setOpenCart((prev) => !prev);
              }}
              className="uppercase py-[8px] px-[20px] my-[20px] rounded-[5px] ring-2 ring-red-3 text-red-500 cursor-pointer"
            >
              clear cart
            </div>
            <div
              onClick={handleCheckout}
              className="py-[8px] px-[20px] my-[20px] rounded-[5px] bg-red-500 text-white cursor-pointer"
            >
              {loading ? "Checking out..." : "Checkout"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
