import DataTable from "react-data-table-component";
import { FcFullTrash } from "react-icons/fc";
import { useState } from "react";
import CreateProduct from "../../components/admin/CreateProduct";
import makeRequest from "../../utils/makeRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    name: "Category",
    // sortable: true,
    selector: (row: any) => row.category,
  },
  {
    name: "Price ($)",
    // sortable: true,
    selector: (row: any) => row.price,
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

const Products = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res: any = await makeRequest.get("/products");
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
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await makeRequest.delete(`/products/${id}`);
    },
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete products");
      console.error("Delete error:", error);
    },
  });

  const handleDelete = (id: string) => {
    if (deleteMutation.isPending) return;

    if (confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  // if (isLoading) return "Loading...";
  // if (isError || !products) return <div>Products not found.</div>;

  const filteredProducts: any = products?.map((product: any, index: any) => {
    return {
      sn: index + 1,
      id: product._id,
      image: (
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src={product.image}
          alt=""
        />
      ),
      name: product.name,
      desc: product.desc,
      category: product.category.name,
      price: <div>{product.price.toFixed(2)}</div>,
      createdAt: product.createdAt,
      action: (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/products/${product._id}`)}
            className="text-sm p-1 text-[orange] cursor-pointer  rounded-[3px]"
          >
            View
          </button>
          <FcFullTrash
            onClick={() => handleDelete(product._id)}
            className="text-[20px] cursor-pointer"
          />
        </div>
      ),
    };
  });

  return (
    <div className="flex-8 p-5 flex flex-col gap-10">
      {open && <CreateProduct setOpen={setOpen} />}
      <div className="flex items-center justify-between text-[20px]">
        <div>Products</div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-1 ring ring-[orange] cursor-pointer text-[orange] rounded-[5px] w-[100px]"
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
            data={filteredProducts}
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

export default Products;
