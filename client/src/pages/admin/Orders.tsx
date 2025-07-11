import { FcFullTrash } from "react-icons/fc";
import makeRequest from "../../utils/makeRequest";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import DataTable from "react-data-table-component";
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

const Orders = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res: any = await makeRequest.get("/orders");
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

  const {
    data: orders,
    isLoading,
    isError,
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
      id: order._id,
      fullName: order.user.fullName,
      image: (
        <img
          className="w-[36px] h-[36px] rounded-full object-cover"
          src={order.products[0].image}
          alt=""
        />
      ),
      quantity: order.products.length,
      totalPrice: <span className="">{order.totalPrice.toFixed(2)}</span>,
      status: (
        <div
          className={`${
            order.status === "pending"
              ? "text-gray-500"
              : order.status === "preparing"
              ? "text-amber-300"
              : order.status === "delivered"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {order.status}
        </div>
      ),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
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
    <div className="flex-8 p-5 flex flex-col gap-10">
      <div className="flex items-center justify-between text-[20px]">
        <div>Orders</div>
        <div className="p-1 ring ring-red-300 cursor-pointer text-red-500 rounded-[5px] w-[100px]">
          Create
        </div>
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
            data={structuredOrders}
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

export default Orders;
