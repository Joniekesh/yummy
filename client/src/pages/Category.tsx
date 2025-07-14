import { useLocation } from "react-router-dom";
import CountDown from "../components/CountDown";
import { Link } from "react-router-dom";
import makeRequest from "../utils/makeRequest";
import { useQuery } from "@tanstack/react-query";
import type { IProduct } from "../interfaces";
import { useState } from "react";

const Category = () => {
  const { state } = useLocation();
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res: any = await makeRequest.get(`/products?cat=${state._id}`);
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
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", state?._id],
    queryFn: fetchProducts,
    enabled: !!state?._id,
  });

  return (
    <div className="w-full mt-25 mb-10 flex flex-col gap-5">
      {isLoading ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          Loading...
        </div>
      ) : isError ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          {errorMessage}
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-4 px-4">
            <h1 className="uppercase font-bold text-[30px]">{state?.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-[10px]">
              {products.map((item: IProduct) => (
                <Link
                  to={`/foods/${item._id}`}
                  className="w-full h-[350px] bg-white p-3 rounded-2xl shadow-2xl cursor-pointer"
                  key={item._id}
                >
                  <img
                    className="w-[100%] h-[80%] rounded-2xl"
                    src={item.image}
                    alt=""
                  />
                  <div className="flex items-center justify-between gap-4 h-[20%]">
                    <div>{item.name}</div>
                    <div className="text-red-500 font-bold text-[26px]">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <CountDown />
        </div>
      )}
    </div>
  );
};

export default Category;
