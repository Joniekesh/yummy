import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import makeRequest from "../../utils/makeRequest";
import type { ICategory } from "../../interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import upload from "../../utils/upload";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Createproduct = ({ setOpen }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
    category: "",
    price: "",
  });

  const { name, desc, category, price } = inputs;
  const isFormIncomplete = !name || !desc || !category || !price || !file;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newProduct: typeof inputs) => {
      const res = await makeRequest.post("/products", newProduct);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully!");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
      console.log("Product creation failed:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !desc || !category || !price || !file) {
      return toast.error("All fields are required");
    }

    if (mutation.isPending) return;

    setUploadingImage(true);

    const url = await upload(file);
    setUploadingImage(false);

    const data = {
      ...inputs,
      image: url,
    };

    mutation.mutate(data);
  };

  const fetchCategories = async () => {
    try {
      const res: any = await makeRequest.get("/categories");
      return res.data;
    } catch (error) {
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

  if (isLoading) return "Loading...";
  if (isError || !categories) return "Categories not found.";

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.6)] z-[999999999]">
      <div className="relative w-full sm:w-[50vw] h-[90vh] flex flex-col items-center justify-center bg-white rounded-[10px]">
        <IoIosCloseCircleOutline
          onClick={() => setOpen((prev) => !prev)}
          className="absolute top-[10px] right-[10px] text-red-500 text-[30px] cursor-pointer"
        />
        <div className="text-[30px]">Create Product</div>
        <form
          onSubmit={handleSubmit}
          className="flex p-3 w-full flex-col gap-4 overflow-y-auto"
        >
          <div className="flex flex-col gap-[5px] w-full">
            <label>Name </label>
            <input
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label>Description</label>
            <textarea
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
              name="desc"
              value={desc}
              onChange={handleChange}
              rows={5}
              cols={10}
            />
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label>Upload Image</label>
            {file ? (
              <div className="relative">
                <img
                  className="w-[200px] h-[200px] rounded-[10px]"
                  src={URL.createObjectURL(file)}
                />

                <span
                  className="absolute -top-2 left-45 "
                  onClick={() => setFile(null)}
                >
                  <IoIosCloseCircleOutline className="absolute text-red-500 text-[30px] cursor-pointer" />
                </span>
              </div>
            ) : (
              <>
                <label htmlFor="singleFile">
                  <img
                    className="w-[50px] h-[50px]"
                    src="/uploadicon.jpg"
                    alt=""
                  />
                </label>
                <input
                  className="hidden"
                  accept="image/*"
                  required
                  type="file"
                  id="singleFile"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </>
            )}
          </div>

          <div className="flex flex-col gap-[5px] w-full">
            <label>Category</label>
            <select
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
              name="category"
              value={category}
              onChange={handleChange}
            >
              <option value="">--select--</option>
              {categories.map((c: ICategory) => (
                <option value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label>Price</label>
            <input
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </div>
          <button
            className={`bg-red-500 text-white p-[10px] cursor-pointer rounded-[5px] ${
              (isFormIncomplete || mutation.isPending) &&
              "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={isFormIncomplete || mutation.isPending}
          >
            {mutation.isPending
              ? "Creating Product..."
              : uploadingImage
              ? "Uploading Image..."
              : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createproduct;
