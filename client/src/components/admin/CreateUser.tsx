import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import makeRequest from "../../utils/makeRequest";
import { toast } from "sonner";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateUser = ({ setOpen }: Props) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const { fullName, email, password, confirmPassword, role } = inputs;
  const isFormIncomplete = !fullName || !email || !password || !role;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newUser: typeof inputs) => {
      const res = await makeRequest.post("/users", newUser);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully!");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
      console.log("User creation failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !email || !password || !email) {
      return toast.error("all fields are required");
    }

    if (password !== confirmPassword) {
      return toast.error("passwords do not match.");
    }
    mutation.mutate(inputs);
  };

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.6)] z-[999999999]">
      <div className="relative w-full sm:w-[50vw] h-[95vh] flex flex-col items-center justify-center bg-white rounded-[10px]">
        <IoIosCloseCircleOutline
          onClick={() => setOpen((prev) => !prev)}
          className="absolute top-[10px] right-[10px] text-red-500 text-[30px] cursor-pointer"
        />
        <div className="text-[30px]">Create User</div>
        <form
          onSubmit={handleSubmit}
          className="flex p-3 w-full flex-col gap-4 overflow-y-auto"
        >
          <div className="flex flex-col gap-[5px] w-full">
            <label>Full Name</label>
            <input
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label>Email</label>
            <input
              type="email"
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label>Password</label>
            <input
              type="password"
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label>Confirm Password</label>
            <input
              type="password"
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-[5px] w-full">
            <label>Role</label>
            <select
              className="ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300"
              name="role"
              value={role}
              onChange={handleChange}
            >
              <option value="">--select--</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            className={`bg-red-500 text-white p-[10px] cursor-pointer rounded-[5px] ${
              (isFormIncomplete || mutation.isPending) &&
              "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={isFormIncomplete || mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
