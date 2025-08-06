"use client";

import { useState } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/store/api/productApi";

import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import ProductTable from "./ProductTable";
import { Pagination } from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const offset = (page - 1) * limit;

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery({ offset, limit });

  const { data: nextPageData = [] } = useGetProductsQuery({
    offset: offset + limit,
    limit,
  });

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = (id: string) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete).unwrap();
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  //  filtering logic
  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category?.name === category : true));

  const totalPages = nextPageData.length > 0 ? page + 1 : page;

  const categories = [
    ...new Set(products.map((p) => p.category?.name).filter(Boolean)),
  ] as string[];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Product List</h1>
           <Link
            href="/assignment-2/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add Product
          </Link>
        </div>
        {/* Search and Limit */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <SearchInput value={search} onChange={setSearch} />
          {/* Limit */}
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border px-3 py-2 rounded w-full sm:w-auto"
          >
            {[10, 20, 50, 100, 500, 1000].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>

        {/* Main Content: Filter + Table */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/6">
            <CategoryFilter
              categories={categories}
              selected={category}
              onSelect={setCategory}
            />
          </div>

          <div className="w-full lg:flex-1 overflow-x-auto">
            {isLoading ? (
              <LoadingSpinner />
            ) : isError ? (
              <div className="text-center py-12 text-red-500">
                Failed to load products
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded shadow">
                  <ProductTable products={filtered} onDelete={handleDelete} />
                  <DeleteConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => {
                      setIsModalOpen(false);
                      setProductToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                  />
                </div>
                <div className="mt-6">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
