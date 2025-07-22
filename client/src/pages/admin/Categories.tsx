import DataTable from "react-data-table-component";
import CreateCategory from "../../components/admin/CreateCategory";
import { useState } from "react";
import makeRequest from "../../utils/makeRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FcFullTrash } from "react-icons/fc";
import type { ICategory } from "../../interfaces";
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
    selector: (row: any) => row.thumbnail,
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
    name: "Category Slug",
    // sortable: true,
    selector: (row: any) => row.slug,
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

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res: any = await makeRequest.get("/categories");
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
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await makeRequest.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete category");
      console.error("Delete error:", error);
    },
  });

  const handleDelete = (id: string) => {
    if (deleteMutation.isPending) return;

    if (confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(id);
    }
  };

  const structuredCategories: any = categories?.map(
    (category: ICategory, index: number) => {
      return {
        sn: index + 1,
        id: category._id,
        name: category.name,
        desc: category.desc,
        slug: category.slug,
        thumbnail: (
          <img
            className="w-[50px] h-[50px] object-cover rounded-full"
            src={category.thumbnail}
            alt=""
          />
        ),
        createdAt: category.createdAt,
        action: (
          <div className="flex items-center gap-2">
            <div
              onClick={() => navigate(`/admin/categories/${category._id}`)}
              className="text-sm p-1 text-[orange] cursor-pointer  rounded-[3px]"
            >
              View
            </div>
            <FcFullTrash
              className="text-[20px] cursor-pointer"
              onClick={() => handleDelete(category._id)}
            />
          </div>
        ),
      };
    }
  );

  return (
    <div className="flex-8 p-5 flex flex-col gap-10">
      {open && <CreateCategory setOpen={setOpen} />}

      <div className="flex items-center justify-between text-[20px]">
        <div>Categories</div>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex itemc justify-center p-1 ring ring-[orange] cursor-pointer text-[orange] rounded-[5px] w-[100px]"
        >
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
            data={structuredCategories}
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

export default Categories;
