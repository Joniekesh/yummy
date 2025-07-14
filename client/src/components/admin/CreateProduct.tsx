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

interface IOption {
  name: string;
  price: number;
}

const Createproduct = ({ setOpen }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [options, setOptions] = useState<IOption[]>([]);
  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState<number>();

  const [inputs, setInputs] = useState({
    name: "",
    desc: "",
    category: "",
    price: "",
  });

  const { name, desc, category, price } = inputs;
  const isFormIncomplete = !name || !desc || !category || !price || !file;

  console.log(options);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOption = () => {
    if (!optionName || !optionPrice) {
      return toast.error("please provide option name and price in the inputs.");
    }

    setOptions([{ name: optionName, price: optionPrice }, ...options]);
    setOptionName("");
    setOptionPrice(1);
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

  const handleSubmit = async () => {
    if (!name || !desc || !category || !price || !file) {
      return toast.error("All fields are required");
    }

    if (mutation.isPending) return;

    setUploadingImage(true);

    const url = await upload(file);
    setUploadingImage(false);

    const data = {
      ...inputs,
      options,
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
          onSubmit={(e) => e.preventDefault()}
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
              min={1}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-[5px] w-full ">
            <label>Options</label>
            <div className="flex flex-wrap gap-3">
              {options &&
                options.map((item) => (
                  <div className="flex items-center gap-5 ring-1 ring-red-500 p-1 cursor-pointer rounded-[5px]">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                    <IoIosCloseCircleOutline
                      onClick={() =>
                        setOptions(
                          options.filter((option) => option.name !== item.name)
                        )
                      }
                      className=" text-red-500 cursor-pointer"
                    />
                  </div>
                ))}
            </div>

            <div className="flex flex-col gap-3 ring-1 ring-[#ddd] p-2 rounded-[5px]">
              <div className="flex items-center justify-between gap-2 w-full">
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-[14px] text-gray-500">
                    Option Name
                  </label>
                  <input
                    className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
                    type="text"
                    placeholder="e.g small,medium,big"
                    value={optionName}
                    onChange={(e) => setOptionName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-[14px] text-gray-500">
                    Option Price
                  </label>
                  <input
                    className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
                    type="number"
                    value={optionPrice}
                    min={1}
                    onChange={(e) => setOptionPrice(Number(e.target.value))}
                  />
                </div>
              </div>
              <button
                onClick={handleAddOption}
                className="flex self-end items-center justify-center bg-red-500 text-white p-[5px] cursor-pointer rounded-[5px] w-[100px] text-center"
              >
                Add
              </button>
            </div>
          </div>
          <button
            className={`bg-red-500 text-white p-[10px] cursor-pointer rounded-[5px] ${
              (isFormIncomplete || mutation.isPending) &&
              "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={isFormIncomplete || mutation.isPending}
            onClick={handleSubmit}
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
