"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder="Search products..."
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
}
