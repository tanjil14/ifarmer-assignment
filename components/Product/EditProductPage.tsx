"use client";

import { useGetProductByIdQuery, useUpdateProductMutation } from "@/store/api/productApi";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";
import LoadingSpinner from "../LoadingSpinner";


export default function EditProductPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id as string);
  const [updateProduct] = useUpdateProductMutation();
  const router = useRouter();

  const handleSubmit = async (values: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }) => {
    try {
      await updateProduct({ id: id as string, data: values }).unwrap();
      toast.success("Product updated successfully");
      router.push("/assignment-2");
    } catch {
      toast.error("Failed to update product");
    }
  };

  if (isLoading || !product) return <LoadingSpinner/>;

  return (
    <ProductForm
      mode="edit"
      initialValues={{
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
        images: product.images,
      }}
      onSubmit={handleSubmit}
    />
  );
}
