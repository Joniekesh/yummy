import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../utils/makeRequest";
import upload from "../../utils/upload";
import { toast } from "sonner";

const AdminCategory = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState<File | string>("");
  const [previewImage, setPreviewImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCategory = async () => {
    const res: any = await makeRequest.get(`/categories/find/${id}`);
    return res.data;
  };

  const {
    data: category,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: fetchCategory,
  });

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDesc(category.desc);
      setThumbnail(category.thumbnail);
      setPreviewImage(category.thumbnail);
    }
  }, [category]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      desc: string;
      thumbnail: string;
    }) => {
      return await makeRequest.put(`/categories/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      toast.success("Category updated.");
    },
    onError: (error: any) => {
      const msg = error?.response?.data || error.message;
      setErrorMessage(msg);
    },
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = thumbnail;

      if (thumbnail instanceof File) {
        imageUrl = await upload(thumbnail);
      }

      mutation.mutate({
        name,
        desc,
        thumbnail: imageUrl as string,
      });
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="flex-8 m-5">
      {isLoading ? (
        <div className="flex h-[100vh] justify-center items-center text-[36px] opacity-30">
          Loading...
        </div>
      ) : isError ? (
        <div className="flex h-[100vh] justify-center items-center text-[36px] opacity-30">
          {errorMessage}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between gap-5">
          <div className="flex h-[max-content] flex-col ring-1 ring-[orange] p-4 rounded-xl">
            <h1 className="text-2xl font-bold">Category Details</h1>
            <div className="flex flex-col gap-4 mt-3">
              <img
                className="w-[150px] h-[150px] rounded-full object-cover"
                src={category.thumbnail}
                alt="thumbnail"
              />
              <div>
                <strong>ID:</strong> {category._id}
              </div>
              <div>
                <strong>Name:</strong> {category.name}
              </div>
              <div>
                <strong>Description:</strong> {category.desc}
              </div>
            </div>
          </div>

          <div className="flex flex-col ring-1 ring-[orange] p-4 rounded-xl w-full md:max-w-md">
            <h1 className="text-2xl font-bold">Edit Category</h1>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-3">
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
                <label className="block mb-1">
                  Thumbnail (Click image to change)
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
                <p className="text-[orange] mt-2">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
