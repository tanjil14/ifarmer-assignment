"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetProductByIdQuery } from "@/store/api/productApi";
import LoadingSpinner from "../LoadingSpinner";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params?.id as string;
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  const [selectedImage, setSelectedImage] = useState<number>(0);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !product) return <p>Failed to load product.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Image Section */}
        <div className="lg:col-span-7">
          <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border">
            <img
              src={product.images[selectedImage]}
              alt={`Product image ${selectedImage + 1}`}
              className="w-full h-full object-cover transition duration-300"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex mt-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-24 h-16 rounded overflow-hidden border-2 ${
                    selectedImage === idx
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            <p className="text-gray-500 text-sm mb-4">
              Category:{" "}
              <span className="text-gray-700 font-medium">
                {product.category.name}
              </span>
            </p>

            <p className="text-gray-700 text-base leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="border-t pt-6 mt-6">
              <p className="text-2xl font-bold text-gray-900 mb-4">
                ${product.price}
              </p>

              <button title="Not Implemented " className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
