"use client";

type Props = {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
};

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <aside className="sticky top-6 w-48 space-y-2">
      <h2 className="text-lg font-bold mb-2">Categories</h2>
      <ul className="space-y-1">
        <li>
          <button
            className={`block w-full text-left px-2 py-1 rounded ${selected === null ? "bg-blue-100" : ""}`}
            onClick={() => onSelect(null)}
          >
            All
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`block w-full text-left px-2 py-1 rounded ${selected === cat ? "bg-blue-100" : ""}`}
              onClick={() => onSelect(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
