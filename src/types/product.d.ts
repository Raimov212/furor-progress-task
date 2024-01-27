export interface Product {
  id: number
  name_uz: string
  product_type_id: number
  cost: number
  address: string
  created_date: string
}

export interface GetProductTypes {
  id: number
  name_uz: string
  name_ru: string
  name_uk: string
  description: null | string
}
