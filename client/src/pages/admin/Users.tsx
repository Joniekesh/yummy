import { useState } from "react";
import CreateUser from "../../components/admin/CreateUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../utils/makeRequest";
import { FcFullTrash } from "react-icons/fc";
import DataTable from "react-data-table-component";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    name: "SN",
    sortable: true,
    selector: (row: any) => row.sn,
  },
  {
    name: "ID",
    // sortable: true,
    selector: (row: any) => row.id,
  },
  {
    name: "Full Name",
    // sortable: true,
    selector: (row: any) => row.fullName,
  },
  {
    name: "Email",
    // sortable: true,
    selector: (row: any) => row.email,
  },
  {
    name: "Authentication Type",
    // sortable: true,
    selector: (row: any) => row.authType,
  },
  {
    name: "Role",
    // sortable: true,
    selector: (row: any) => row.role,
  },
  {
    name: "Date Created",
    // sortable: true,
    selector: (row: any) => row.createdAt,
  },
  {
    name: "Action",
    // sortable: true,
    selector: (row: any) => row.action,
  },
];

const Users = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res: any = await makeRequest.get("/users");
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
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await makeRequest.delete(`/users/${id}`);
    },
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete user");
      console.error("Delete error:", error);
    },
  });

  const handleDelete = (id: string) => {
    if (deleteMutation.isPending) return;

    if (confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  const structuredUsers = users?.map((user: any, index: any) => {
    return {
      sn: index + 1,
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      authType: user.authType,
      role: <span className="uppercase font-medium">{user.role}</span>,
      createdAt: user.createdAt,
      action: (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/users/${user._id}`)}
            className="text-sm p-1 text-red-500 cursor-pointer  rounded-[3px]"
          >
            View
          </button>
          <FcFullTrash
            onClick={() => handleDelete(user._id)}
            className="text-[20px] cursor-pointer"
          />
        </div>
      ),
    };
  });

  return (
    <div className="flex-8 p-5 flex flex-col gap-10">
      {open && <CreateUser setOpen={setOpen} />}

      <div className="flex items-center justify-between text-[20px]">
        <div>Users</div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-1 ring ring-red-300 cursor-pointer text-red-500 rounded-[5px] w-[100px]"
        >
          Create
        </button>
      </div>
      <div>
        {isLoading ? (
          <div className="flex text-center h-[50vh] items-center justify-center text-[36px] opacity-[0.3]">
            Loading...
          </div>
        ) : isError ? (
          <div className="flex text-center h-[50vh] items-center justify-center text-[36px] opacity-[0.3]">
            {errorMessage}
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={structuredUsers}
            responsive={true}
            // selectableRows
            // selectableRowsHighlight
            // onSelectedRowsChange={handleRowSelected}
            pagination={true}
            highlightOnHover={true}
            striped={true}
            pointerOnHover={true}
            // selectableRowsVisibleOnly={true}
            // selectableRowsSingle={true}
            // expandableRowsComponent={ExpandedComponent}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
