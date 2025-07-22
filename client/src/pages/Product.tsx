import { useParams } from "react-router-dom";
import CountDown from "../components/CountDown";
import { useState } from "react";
import type { IOption, IProduct } from "../interfaces";
import { useQuery } from "@tanstack/react-query";
import makeRequest from "../utils/makeRequest";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/reducers/cartReducers";
import { toast } from "sonner";

const Product = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams<{ id: string }>();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState<IOption>();

  const dispatch = useAppDispatch();

  const fetchProduct = async () => {
    try {
      const res: any = await makeRequest.get(`/products/find/${id}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        setErrorMessage(error?.response?.data);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<IProduct>({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        desc: product.desc,
        image: product.image,
        price: (product.price ?? 0) + (selectedOption?.price ?? 0),
        size: selectedOption?.name,
        qty: quantity,
      })
    );

    toast.success("Item added to the cart.");
  };

  return (
    <div className="w-full h-[max-content]  flex items-center justify-center flex-col gap-5">
      {isLoading ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          Loading...
        </div>
      ) : isError ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          {errorMessage || "Something went wrong"}
        </div>
      ) : (
        <div className="flex w-full flex-col gap-10 mt-20 min-h-[70vh]">
          <div className="flex px-4 md:px-8 justify-between items-center flex-col sm:flex-row sm:gap-20 gap-5">
            <div className="h-[200px] w-[200px] sm:h-[400px] sm:w-[400px]">
              <img
                className="w-full h-full rounded-full object-cover"
                src={product?.image}
                alt={product?.name}
              />
            </div>
            <div className="h-1/2 gap-4 flex flex-col items-center justify-center sm:items-start">
              <div className="uppercase text-center font-bold text-[30px]">
                {product?.name}
              </div>
              <div>{product?.desc}</div>
              {product?.options && (
                <div className="flex items-center gap-3">
                  {product?.options?.map((option) => (
                    <span
                      key={option._id}
                      onClick={() => setSelectedOption(option)}
                      className={`${
                        selectedOption === option && "bg-[orange] text-white"
                      } p-1 w-[70px] ring-1 ring-[orange] rounded-[5px] cursor-pointer flex items-center justify-center`}
                    >
                      {option?.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-[30px] text-[orange] font-bold">
                $
                {((product?.price ?? 0) + (selectedOption?.price ?? 0)).toFixed(
                  2
                )}
              </div>
              <div className="flex items-center w-full h-[45px] pl-2 ring-2 ring-[orange] rounded-[8px] gap-2">
                <div className="flex items-center gap-2 text-[20px]">
                  <div
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="font-bold px-2 cursor-pointer"
                  >
                    -
                  </div>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-10 text-center outline-none border border-gray-300 rounded"
                  />
                  <div
                    onClick={() => setQuantity((q) => q + 1)}
                    className="font-bold px-2 cursor-pointer"
                  >
                    +
                  </div>
                </div>

                <div
                  onClick={handleAddToCart}
                  className="ml-auto flex items-center justify-center h-full px-4 bg-[orange] uppercase rounded-[8px] text-white text-sm font-semibold cursor-pointer"
                >
                  Add to Cart
                </div>
              </div>
            </div>
          </div>
          <CountDown />
        </div>
      )}
    </div>
  );
};

export default Product;
