import { useParams } from "react-router-dom";
import makeRequest from "../../utils/makeRequest";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import { toast } from "sonner";

const columns = [
  {
    name: "SN",
    sortable: true,
    selector: (row: any) => row.sn,
  },
  {
    name: "Image",
    // sortable: true,
    selector: (row: any) => row.image,
  },
  {
    name: "Name",
    // sortable: true,
    selector: (row: any) => row.name,
  },
  {
    name: "Description",
    // sortable: true,
    selector: (row: any) => row.desc,
  },
  {
    name: "Qty",
    // sortable: true,
    selector: (row: any) => row.qty,
  },
  {
    name: "Price ($)",
    // sortable: true,
    selector: (row: any) => row.price,
  },
];

const AdminOrder = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();

  const fetchOrder = async () => {
    try {
      const res: any = await makeRequest.get(`/orders/find/${id}`);
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
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: fetchOrder,
  });

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const structuredProducts: any = order?.products?.map(
    (product: any, index: any) => {
      return {
        sn: index + 1,
        image: (
          <img
            className="w-[50px] h-[50px] object-cover rounded-full"
            src={product.image}
            alt=""
          />
        ),
        name: product.name,
        desc: product.desc,
        qty: product.qty,
        price: (
          <div className="font-medium text-red-400">
            {product.price.toFixed(2)}
          </div>
        ),
      };
    }
  );

  const mutation = useMutation({
    mutationFn: async (data: { status: string }) => {
      return await makeRequest.put(`/orders/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", id] });
      toast.success("Order updated.");
    },
    onError: (error: any) => {
      const msg = error?.response?.data || error.message;
      setErrorMessage(msg);
      console.log(error);
    },
  });

  console.log(status);
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "") {
      toast.error("Status is required");
      return;
    }

    const confirmUpdate = window.confirm(
      "Are you sure you want to update this order?"
    );
    if (!confirmUpdate) return;

    try {
      mutation.mutate({ status });
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="flex-8">
      {isLoading ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          Loading...
        </div>
      ) : isError ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          {errorMessage}
        </div>
      ) : (
        <div className="p-2 m-5 flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:justify-between gap-6 ring-2 ring-red-300 rounded-[10px] p-[10px]">
            <div className="flex flex-col gap-2 ">
              <h1 className="text-bold text-[30px]">Order Details</h1>

              <div className="flex items-center gap-1 text-[20px]">
                <div>ID:</div>
                <div
                  className={`${
                    order?.status === "delivered"
                      ? "text-green-500"
                      : "text-red-300"
                  } capitalize font-bold`}
                >
                  {order._id}
                </div>
              </div>
              <div className="flex items-center gap-1 text-[20px]">
                <div className="">Status:</div>
                <div
                  className={`${
                    order?.status === "pending"
                      ? "text-gray-500"
                      : order?.status === "preparing"
                      ? "text-amber-300"
                      : order?.status === "delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  } capitalize`}
                >
                  {order.status}
                </div>
              </div>
              <div className="flex items-center gap-1 text-[20px]">
                <div>Total Price:</div>
                <div
                  className={`${
                    order.status === "delivered"
                      ? "text-green-500"
                      : "text-red-400"
                  } font-medium`}
                >
                  $ {order.totalPrice.toFixed(2)}
                </div>
              </div>

              <div className="flex flex-col gap-2 text-[20px] mt-2">
                <label className="font-semibold">Update Order Status</label>
                <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                  <select
                    value={status || order.status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full ring-1 cursor-pointer ring-[#ddd] p-[5px] rounded-[5px] outline-0 focus:ring-2 focus:ring-red-300 text-[16px]"
                  >
                    <option value="pending">Pending</option>
                    <option value="preparing">Being prepared</option>
                    <option value="delivered">Delivered</option>
                    {/* {order.status !== "preparing" && ( */}
                    <option value="cancel">Cancelled</option>
                    {/* )} */}
                  </select>

                  <button
                    type="submit"
                    className="bg-red-500 cursor-pointer text-white rounded px-4 py-2 hover:bg-red-600 w-max text-sm"
                    disabled={mutation.isPending || status === order.status}
                  >
                    {mutation.isPending ? "Updating..." : "Update Status"}
                  </button>
                </form>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-4 items-center justify-center bg-white p-[10px] rounded-[10px] shadow-sm">
                <img
                  className="w-[100px] h-[100px] rounded-full object-cover"
                  src="/avatar.jpg"
                  alt=""
                />

                <div className="flex gap-2 items-center">
                  <span className="text-gray-500">Full Name:</span>
                  <span className="text-[20px]">{order.user.fullName}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-[20px]">{order.user.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col gap-[10px] mt-[30px]">
            <div className="flex items-center justify-between">
              <h1 className="capitalize text-[20px]">Product Details</h1>
              <div className="flex gap-1 items-center">
                <span className="text-gray-500">Date Ordered:</span>
                <span className="">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={structuredProducts}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrder;
