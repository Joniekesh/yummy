import { useQuery } from "@tanstack/react-query";
import makeRequest from "../../utils/makeRequest";
import { useParams } from "react-router-dom";
import { useState } from "react";
import DataTable from "react-data-table-component";

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

const MyOrder = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

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

  const structuredProducts: any = order?.products?.map(
    (product: any, index: any) => {
      return {
        sn: index + 1,
        image: (
          <img
            className="w-[40px] h-[40px] object-cover rounded-full"
            src={product.image}
            alt=""
          />
        ),
        name: product.name,
        desc: product.desc,
        qty: product.qty,
        price: (
          <div className="font-medium text-[orange]">
            {product.price.toFixed(2)}
          </div>
        ),
      };
    }
  );
  return (
    <div className="m-3 p-3">
      {isLoading ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          Loading...
        </div>
      ) : isError ? (
        <div className="flex text-center h-[100vh] items-center justify-center text-[36px] opacity-[0.3]">
          {errorMessage}
        </div>
      ) : (
        <div className="flex-col gap-20">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-bold text-[30px]">Order Details</h1>
            <div className="flex items-center gap-1 text-[20px]">
              <div>ID:</div>
              <div
                className={`${
                  order?.status === "delivered"
                    ? "text-green-500"
                    : ""
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
                    : "text-[orange]"
                } font-medium`}
              >
                $ {order.totalPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mt-15">
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

export default MyOrder;
