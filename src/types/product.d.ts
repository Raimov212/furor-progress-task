export interface Product {
  id: number
  name_uz: string
  product_type_id: number
  cost: number
  address: string
  created_date: string
}

export interface ProductType {
  product: Product[]
}
