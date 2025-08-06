import { Product } from "@/types/product";
import ProductRow from "./ProductRow";

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
};

export default function ProductTable({ products, onDelete }: Props) {
  return (
    <div className="overflow-auto rounded-lg shadow bg-white max-h-[calc(100vh-64px)]">
      <table className="min-w-full text-sm text-left text-gray-600 table-auto">
        <thead className="sticky top-0 z-10 bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-6 py-4 font-medium">Image</th>
            <th className="px-6 py-4 font-medium">Title</th>
            <th className="px-6 py-4 font-medium">Price</th>
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <ProductRow key={product.id} product={product} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
