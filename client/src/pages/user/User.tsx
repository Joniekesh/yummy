import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getUser from "../../utils/getUser";
import makeRequest from "../../utils/makeRequest";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const columns = [
  { name: "SN", selector: (row: any) => row.sn },
  { name: "ID", selector: (row: any) => row.id },
  { name: "Customer", selector: (row: any) => row.fullName },
  { name: "Image", selector: (row: any) => row.image },
  { name: "Product Quantity", selector: (row: any) => row.quantity },
  { name: "Total Price ($)", selector: (row: any) => row.totalPrice },
  { name: "Status", selector: (row: any) => row.status },
  { name: "Creation Time", selector: (row: any) => row.createdAt },
  { name: "Processed Time", selector: (row: any) => row.updatedAt },
  { name: "Action", selector: (row: any) => row.action },
];

const User = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const user = getUser();
  const navigate = useNavigate();

  const fetchMyOrders = async () => {
    try {
      const res: any = await makeRequest.get("/orders/me");
      return res.data;
    } catch (error: any) {
      const message =
        error?.response?.data || error.message || "An error occurred.";
      setErrorMessage(message);
      console.error("Order Fetch Error:", error);
      throw new Error(message);
    }
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myorders"],
    queryFn: fetchMyOrders,
  });

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
            onClick={() => navigate(`/user/orders/${order._id}`)}
            className="text-sm p-1 text-red-500 cursor-pointer  rounded-[3px]"
          >
            View
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="flex flex-col gap-6 p-4">
      {isLoading ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          Loading...
        </div>
      ) : isError || errorMessage ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          {errorMessage}
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 items-center bg-white shadow-sm rounded-[10px] p-6">
            <img
              className="w-[150px] h-[150px] rounded-full object-cover"
              src="/avatar.jpg"
              alt="User Avatar"
            />
            <div className="text-lg text-gray-700">
              <strong className="text-gray-500">Full Name:</strong>{" "}
              {user.fullName}
            </div>
            <div className="text-lg text-gray-700">
              <strong className="text-gray-500">Email:</strong> {user.email}
            </div>
            <div className="text-lg text-gray-700">
              <strong className="text-gray-500">Authentication Type:</strong>{" "}
              {user.authType}
            </div>
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
    </div>
  );
};

export default User;
