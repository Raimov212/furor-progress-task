export const columns: any[] = [
  {
    name: 'id',
    label: 'ID',
    align: 'left',
    sortable: true,
    field: 'id'
  },
  { name: 'name_uz', label: 'Name', field: 'name_uz', sortable: true },
  { name: 'product_type_id', label: 'Product Type', field: 'product_type_id', sortable: true },
  { name: 'cost', label: 'Cost', field: 'cost', sortable: true },
  { name: 'address', label: 'Address', field: 'address' },
  {
    name: 'created_date',
    label: 'Date',
    field: 'created_date',
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)
  }
]
