import { Link } from "react-router-dom";
import CountDown from "../components/CountDown";
import { useQuery } from "@tanstack/react-query";
import makeRequest from "../utils/makeRequest";
import type { ICategory } from "../interfaces";
import { useState } from "react";

const Foods = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCategories = async () => {
    try {
      const res: any = await makeRequest.get("/categories");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        setErrorMessage(error?.response?.data);
      } else {
        setErrorMessage(error.message);
      }
      console.log(error);
    }
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <>
      {isLoading ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          Loading...
        </div>
      ) : isError ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          {errorMessage}
        </div>
      ) : (
        <div className="w-full mt-25 flex flex-col gap-5">
          <div className="flex flex-col gap-4 px-4">
            <div className="text-3xl text-red-500">Yummy Categories</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.isArray(categories) ? (
                categories.map((cat: ICategory) => (
                  <Link
                    key={cat._id}
                    to={`/foods/category?cat=${cat.slug}`}
                    state={cat}
                    className="relative rounded-[10px] h-[300px] overflow-hidden cursor-pointer hover:bg-red-500"
                  >
                    <img
                      className="w-[100%] h-[100%] object-cover"
                      src={cat.thumbnail}
                      alt=""
                    />
                    <div className="absolute top-[10px] left-[10px] bg-amber-200 p-[4px] rounded-[5px]">
                      {cat.name}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center text-red-500 text-lg">
                  Failed to load categories
                </div>
              )}
            </div>
          </div>
          <CountDown />
        </div>
      )}
    </>
  );
};

export default Foods;
