import Link from "next/link";
import { Product } from "@/types/product";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

type Props = {
  product: Product;
  onDelete: (id: string) => void;
};

export default function ProductRow({ product, onDelete }: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-2">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.title}
          className="h-12 w-12 object-cover rounded"
        />
      </td>
      <td className="px-6 py-4 font-medium">{product.title}</td>
      <td className="px-6 py-4">${product.price}</td>
      <td className="px-6 py-4">{product.category?.name || "—"}</td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end items-center space-x-1">
          <Link
            href={`/assignment-2/${product.id}`}
            className="p-2 rounded hover:bg-blue-100 text-blue-600"
            title="View"
          >
            <FaEye />
          </Link>
          <Link
            href={`/assignment-2/edit/${product.id}`}
            className="p-2 rounded hover:bg-yellow-100 text-yellow-600"
            title="Edit"
          >
            <FaEdit />
          </Link>
          <button
            onClick={() => onDelete(product.id.toString())}
            className="p-2 rounded hover:bg-red-100 text-red-600"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}
