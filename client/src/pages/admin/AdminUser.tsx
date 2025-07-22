import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import makeRequest from "../../utils/makeRequest";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const AdminUser = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const fetchUser = async () => {
    const res: any = await makeRequest.get(`/users/find/${id}`);
    return res.data;
  };

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: fetchUser,
  });

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: async (data: {
      fullName: string;
      email: string;
      role: string;
    }) => {
      return await makeRequest.put(`/users/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      toast.success("User updated.");
    },
    onError: (error: any) => {
      const msg = error?.response?.data || error.message;
      setErrorMessage(msg);
      toast.error(msg);
    },
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !role) {
      toast.error("All fields are required.");
      return;
    }

    // if (
    //   fullName === user.fullName &&
    //   email === user.email &&
    //   role === user.role
    // ) {
    //   toast.error("No changes detected.");
    //   return;
    // }

    const confirmed = window.confirm(
      "Are you sure you want to update this user?"
    );
    if (!confirmed) return;

    try {
      mutation.mutate({ fullName, email, role });
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="flex-8 m-5">
      {isLoading ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          Loading...
        </div>
      ) : isError ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          {errorMessage}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between gap-5">
          <div className="flex flex-col ring-1 ring-[orange] p-4 rounded-xl h-[max-content]">
            <h1 className="text-2xl font-bold">User Details</h1>
            <div className="flex flex-col gap-4 mt-3">
              <img
                className="w-[150px] h-[150px] rounded-full object-cover"
                src="/avatar.jpg"
                alt="thumbnail"
              />
              <div>
                <strong>ID:</strong> {user._id}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Name:</strong>{" "}
                <span className="capitalize">{user.fullName}</span>
              </div>
              <div>
                <strong>Role:</strong>{" "}
                <span className="capitalize">{user.role}</span>
              </div>
              <div>
                <strong>Member since:</strong>{" "}
                {new Date(user.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex flex-col ring-1 h-[max-content] ring-[orange] p-4 rounded-xl w-full md:max-w-md">
            <h1 className="text-2xl font-bold">Edit User</h1>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-3">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  className="w-full ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[orange]"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <input
                  className="w-full ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[orange]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1">Role</label>
                <select
                  className="w-full cursor-pointer ring-1 ring-[#ddd] p-[10px] rounded-[5px] outline-0 focus:ring-2 focus:ring-[orange]"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
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

export default AdminUser;
