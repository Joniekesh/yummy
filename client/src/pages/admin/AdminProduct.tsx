import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import makeRequest from "../../utils/makeRequest";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import upload from "../../utils/upload";

const AdminProduct = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [image, setImage] = useState<File | string>("");
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  console.log(categories);

  const fetchProduct = async () => {
    const res: any = await makeRequest.get(`/products/find/${id}`);
    return res.data;
  };

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDesc(product.desc);
      setImage(product.image);
      setCategory(product.category._id);
      setPreviewImage(product.image);
      setPrice(product.price);
    }
  }, [product]);

  // Handle file selection
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      desc: string;
      image: string;
      category: string;
      price: number;
    }) => {
      return await makeRequest.put(`/products/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success("Product updated.");
      //   navigate("/admin/products");
    },
    onError: (error: any) => {
      const msg = error?.response?.data || error.message;
      setErrorMessage(msg);
    },
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = image;

      if (image instanceof File) {
        imageUrl = await upload(image);
      }

      mutation.mutate({
        name,
        desc,
        category,
        price: Number(price),
        image: imageUrl as string,
      });
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="flex-8 m-5">
      {isLoading || isLoadingCategories ? (
        <div className="flex h-[100vh] justify-center items-center text-[36px] opacity-30">
          Loading...
        </div>
      ) : isError || isErrorCategories ? (
        <div className="flex h-[100vh] justify-center items-center text-[36px] opacity-30">
          {errorMessage}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between gap-5">
          <div className="flex flex-col ring-1 ring-[orange] p-4 rounded-xl h-[max-content]">
            <h1 className="text-2xl font-bold">Product Details</h1>
            <div className="flex flex-col gap-4 mt-3">
              <img
                className="w-[150px] h-[150px] rounded-full object-cover"
                src={product.image}
                alt="thumbnail"
              />
              <div>
                <strong>ID:</strong> {product._id}
              </div>
              <div>
                <strong>Category:</strong> {product.category.name}
              </div>
              <div>
                <strong>Name:</strong> {product.name}
              </div>
              <div>
                <strong>Description:</strong> {product.desc}
              </div>

              <div>
                <strong>Price:</strong> ${product.price.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex flex-col ring-1 ring-[orange] p-4 rounded-xl w-full md:max-w-md">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-3">
              <div>
                <label className="block mb-1">Category</label>
                <select
                  className="w-full ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[orange]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat: any) => (
                    <option value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Name</label>
                <input
                  className="w-full ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[orange]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <input
                  className="w-full ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[orange]"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">price</label>
                <input
                  className="w-full ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[orange]"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">
                  Product Image (Click image to change)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-[100px] h-[100px] object-cover rounded cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    title="Click to change image"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-[#161618] text-white rounded px-4 py-2 hover:bg-[orange] cursor-pointer"
              >
                {mutation.isPending ? "Updating..." : "Update"}
              </button>
              {mutation.isError && (
                <p className="text-red-600 mt-2">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
