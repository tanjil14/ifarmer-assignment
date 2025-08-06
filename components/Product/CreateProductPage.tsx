"use client";

import { useAddProductMutation } from "@/store/api/productApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";


export default function CreateProductPage() {
  const [addProduct] = useAddProductMutation();
  const router = useRouter();

  const handleSubmit = async (values: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }) => {
    try {
      await addProduct(values).unwrap();
      toast.success("Product created successfully");
      router.push("/assignment-2");
    } catch (err) {
      toast.error("Failed to create product");
    }
  };

  return <ProductForm mode="create" onSubmit={handleSubmit} />;
}
