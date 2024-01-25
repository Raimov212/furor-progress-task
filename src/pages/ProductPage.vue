<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import type { Product } from '../types/product'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'product-page',
  setup() {
    const store = useStore()

    const products = ref<Product[]>([])
    const columns: any[] = [
      {
        name: 'id',
        label: 'Id',
        align: 'left',
        sortable: true,
        field: (row: { id: any }) => row.id,
        format: (val: any) => `${val}`
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

    onMounted(() => {
      store.dispatch('fetchProduct')
    })

    computed(() => {
      return store.getters.getAllProducts
    })

    return { products, columns, store }
  }
})
</script>

<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="store.getters.getAllProducts"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
    />
  </div>
</template>

<style lang="scss" scoped></style>
