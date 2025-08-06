import { Product } from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], {offset:number;limit:number}>({
      query: ({offset,limit}) => `/products?offset=${offset}&limit=${limit}`,
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),
    deleteProduct:builder.mutation<void,string>({
      query:(id)=>({
        url:`/products/${id}`,
        method:'DELETE',
      }),
      onQueryStarted:async (id,{dispatch,queryFulfilled })=>{
        const patchResult=dispatch(
          productApi.util.updateQueryData('getProducts',{offset:0,limit:10},(draft)=>{
            return draft.filter((product)=>product.id !=Number(id))
          })
        )

        try{
         await queryFulfilled;
        }catch{
         patchResult.undo()
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
