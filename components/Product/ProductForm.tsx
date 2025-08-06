"use client";

import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

type ProductFormProps = {
  onSubmit: (payload: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }) => void;
  initialValues?: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  };
  mode?: "create" | "edit";
};

const DEFAULT_IMAGE = "https://placehold.co/600x400";

export default function ProductForm({
  onSubmit,
  initialValues,
  mode = "create",
}: ProductFormProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setPrice(initialValues.price);
      setDescription(initialValues.description);
      setCategoryId(initialValues.categoryId);
      setImageUrl(initialValues.images[0] || "");
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !categoryId) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: [imageUrl || DEFAULT_IMAGE],
    };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md space-y-4 border"
    >
      <h2 className="text-xl font-semibold mb-2">
        {mode === "edit" ? "Update Product" : "Add New Product"}
      </h2>

      <div className="flex flex-col">
        <label className="font-medium">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Price (USD) *</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border border-gray-300 p-2 rounded"
          min={0}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Description *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Category *</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="border border-gray-300 p-2 rounded"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Image URL (optional)</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          placeholder={`Leave empty to use default image: ${DEFAULT_IMAGE}`}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded cursor-pointer"
      >
        {mode === "edit" ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}
