import Card from "../../components/admin/Card";
import DataTable from "react-data-table-component";
import { CgDollar } from "react-icons/cg";
import { FaCartPlus, FaUsers } from "react-icons/fa";
import { LuPizza } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../../utils/makeRequest";
import { useState } from "react";
import { FcFullTrash } from "react-icons/fc";
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
    name: "Customer",
    // sortable: true,
    selector: (row: any) => row.fullName,
  },
  {
    name: " Image",
    // sortable: true,
    selector: (row: any) => row.image,
  },
  {
    name: "Product Quantity ",
    // sortable: true,
    selector: (row: any) => row.quantity,
  },
  {
    name: "Total Price ($)",
    // sortable: true,
    selector: (row: any) => row.totalPrice,
  },
  {
    name: "Status",
    // sortable: true,
    selector: (row: any) => row.status,
  },
  {
    name: "Creation Time",
    // sortable: true,
    selector: (row: any) => row.createdAt,
  },
  {
    name: "Processed Time",
    // sortable: true,
    selector: (row: any) => row.updatedAt,
  },
  {
    name: "Action",
    // sortable: true,
    selector: (row: any) => row.action,
  },
];

const Admin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOrdersMessage, setErrorOrdersMessage] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchdashDoard = async () => {
    try {
      const res: any = await makeRequest.get("/users/dashboard");
      console.log(res.data);
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

  const fetchOrders = async () => {
    try {
      const res: any = await makeRequest.get("/orders");
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        setErrorOrdersMessage(error?.response?.data);
      } else {
        setErrorOrdersMessage(error.message);
      }
      console.log(error);
    }
  };

  const {
    data: dashboard,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchdashDoard,
  });

  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await makeRequest.delete(`/orders/${id}`);
    },
    onSuccess: () => {
      toast.success("Order deleted");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete Order");
      console.error("Delete error:", error);
    },
  });

  const handleDelete = (id: string) => {
    if (deleteMutation.isPending) return;

    if (confirm("Are you sure you want to delete this order?")) {
      deleteMutation.mutate(id);
    }
  };

  const structuredOrders: any = orders?.map((order: any, index: number) => {
    return {
      sn: index + 1,
      id: order?._id,
      fullName: order?.user?.fullName,
      image: (
        <img
          className="w-[36px] h-[36px] rounded-full object-cover"
          src={order?.products[0]?.image}
          alt=""
        />
      ),
      quantity: order?.products?.length,
      totalPrice: <span className="">{order?.totalPrice?.toFixed(2)}</span>,
      status: (
        <div
          className={`${
            order?.status === "pending"
              ? "text-gray-500"
              : order?.status === "preparing"
              ? "text-amber-300"
              : order?.status === "delivered"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {order?.status}
        </div>
      ),
      createdAt: order?.createdAt,
      updatedAt: order?.updatedAt,
      action: (
        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate(`/admin/orders/${order._id}`)}
            className="text-sm p-1 text-red-500 cursor-pointer  rounded-[3px]"
          >
            View
          </div>
          <FcFullTrash
            className="text-[20px] cursor-pointer"
            onClick={() => handleDelete(order._id)}
          />
        </div>
      ),
    };
  });
  return (
    <>
      {isLoading || isLoadingOrders ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          Loading...
        </div>
      ) : isError || isErrorOrders || errorOrdersMessage ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          {errorMessage}
        </div>
      ) : (
        <div className="p-5 flex flex-col gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            <Card
              url="#"
              name="Sales"
              sales={dashboard.sales}
              icon={CgDollar}
              currency
            />
            <Card
              url="/admin/orders"
              name="Orders"
              sales={dashboard.orders}
              icon={FaCartPlus}
            />
            <Card
              url="/admin/users"
              name="Users"
              sales={dashboard.users}
              icon={FaUsers}
            />
            <Card
              url="/admin/products"
              name="Products"
              sales={dashboard.products}
              icon={LuPizza}
            />
            <Card
              url="/admin/categories"
              name="Categories"
              sales={dashboard.categories}
              icon={MdCategory}
            />
          </div>
          <div>
            <div className="text-2xl">Recent Orders</div>
            <DataTable
              columns={columns}
              data={structuredOrders}
              responsive={true}
              selectableRows
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
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
