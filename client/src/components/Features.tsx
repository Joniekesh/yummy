import { useQuery } from "@tanstack/react-query";
import makeRequest from "../utils/makeRequest";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  console.log(selected);

  const fetchProducts = async () => {
    try {
      const res: any = await makeRequest.get("/products");
      return res.data;
    } catch (error: any) {
      const message = error?.response?.data || error.message;
      setErrorMessage(message);
    }
  };

  const fetchCategories = async () => {
    try {
      const res: any = await makeRequest.get("/categories");
      return res.data;
    } catch (error: any) {
      const message = error?.response?.data || error.message;
      setErrorMessage(message);
    }
  };

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Set default category on load
  useEffect(() => {
    if (categories?.length && !selected) {
      setSelected(categories[0]);
    }
  }, [categories]);

  // Filter products on category change
  useEffect(() => {
    if (products && selected) {
      const filtered = products.filter(
        (product: any) => product.category._id === selected._id
      );
      setFilteredProducts(filtered);
    }
  }, [products, selected]);

  // Slice to show only first 8
  const displayedProducts = filteredProducts?.slice(0, 8);

  return (
    <div className="px-4 md:px-10 min-h-screen my-10">
      <h1 className="text-center text-[30px] font-[500]">Popular Goods</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 mb-10">
        {categories?.map((cat: any) => (
          <button
            key={cat._id}
            onClick={() => setSelected(cat)}
            className={`font-sm cursor-pointer rounded-2xl p-1 text-[14px] ${
              selected?._id === cat?._id
                ? " bg-[#D99703] "
                : "bg-white text-black"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product List */}
      {isLoadingProducts || isLoadingCategories ? (
        <p className="text-center">Loading...</p>
      ) : errorMessage || isErrorCategories || isErrorProducts ? (
        <p className="text-center text-red-500">{errorMessage}</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayedProducts?.map((product: any) => (
              <div
                onClick={() => navigate(`/foods/${product._id}`)}
                key={product._id}
                className="bg-white p-4 flex items-center justify-center flex-col rounded-md shadow hover:shadow-sm transition cursor-pointer gap-2 hover:bg-gray-50"
              >
                <img
                  className="object-cover w-[100px] h-[100px] rounded-full"
                  src={product.image}
                  alt={product.name}
                />
                <div className="flex items-center gap-1 text-[#D99703]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-lg font-bold">{product.name}</span>
                  <span className="text-sm">{product.desc}</span>
                  <p className="text-sm text-gray-600 font-bold text-[20px]">
                    ₦{product.price.toFixed(2)}
                  </p>
                </div>
                <button className="px-4 py-2 text-sm rounded-3xl bg-[#D99703] text-black font-medium transition">
                  Add to cart
                </button>
              </div>
            ))}
          </div>

          {filteredProducts.length > 8 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() =>
                  navigate(`/foods/category?cat=${selected.slug}`, {
                    state: selected,
                  })
                }
                className="px-2 py-1 cursor-pointer rounded-lg bg-black text-white hover:bg-gray-800 transition"
              >
                View More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Features;
