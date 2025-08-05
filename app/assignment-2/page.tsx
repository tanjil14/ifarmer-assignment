"use client"
import { useGetProductsQuery } from '../store/api/productApi'


export default function ProductListPage() {
  const {data,isLoading,error}=useGetProductsQuery()
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      {isLoading ? <p>Loading...</p> : (
        <ul className="space-y-2">
          {data?.map((item: any) => (
            <li key={item.id} className="p-4 border rounded">
              <h2 className="font-semibold">{item.title}</h2>
              <p>{item.price} USD</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
