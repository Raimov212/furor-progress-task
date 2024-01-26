<script lang="ts">
import { defineComponent, ref, onMounted, computed, Ref } from 'vue'
import type { Product } from '../types/product'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import AddProductComp from '../components/product/AddProductComp.vue'

export default defineComponent({
  name: 'product-page',
  components: {
    AddProductComp
  },
  setup() {
    const store = useStore()
    const q = useQuasar()

    const selected: Ref<Product | undefined> = ref()
    const tableRef = ref()

    const columns: any[] = [
      {
        name: 'id',
        label: 'Id',
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

    onMounted(() => {
      store.dispatch('fetchProduct')
    })

    computed(() => {
      return store.getters.getAllProducts
    })

    computed(() => {
      return selected
    })

    return {
      columns,
      selected,
      store,
      tableRef,

      async handleRowsDelete(item: Product) {
        await store.dispatch('deleteProducts', item.id)

        if (store.getters.getAddLoadingProducts) {
          q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Product is created'
          })
        } else {
          q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: `Do not created product!!!`
          })
        }

        console.log('after', store.getters.getAddLoadingProducts)

        store.commit('setAddLoadingProducts', false)
      },

      handleRowsEdit(item: Product) {
        selected.value = item
        store.commit('setPromptDialog', true)
      }
    }
  }
})
</script>

<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      ref="tableRef"
      title="Products table"
      :rows="store.getters.getAllProducts"
      :columns="columns"
      dark
      selection="single"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td>
            <q-btn
              flat
              round
              :icon="props.expand ? 'remove' : 'add'"
              @click="props.expand = !props.expand"
            />
          </q-td>
          <q-td key="id" :props="props">{{ props.row.id }} </q-td>
          <q-td key="name_uz" :props="props">{{ props.row.name_uz }} </q-td>
          <q-td key="product_type_id" :props="props">{{ props.row.product_type_id }} </q-td>
          <q-td key="cost" :props="props">{{ props.row.cost }} </q-td>
          <q-td key="address" :props="props">{{ props.row.address }} </q-td>
          <q-td key="created_date" :props="props">{{ props.row.created_date }} </q-td>
        </q-tr>
        <q-tr v-show="props.expand">
          <q-td>
            <q-btn
              flat
              round
              @click="handleRowsDelete(props.row)"
              :icon="props.expand ? 'delete' : ''"
            />
            <q-btn
              flat
              round
              @click="handleRowsEdit(props.row)"
              :icon="props.expand ? 'edit' : ''"
            />
            <div v-if="store.getters.getPromptDialogProducts">
              <AddProductComp :item="selected" />
            </div>
          </q-td>
          <q-td key="id" :props="props">{{ props.row.id }} </q-td>
          <q-td key="name_uz" :props="props">{{ props.row.name_uz }} </q-td>
          <q-td key="product_type_id" :props="props">{{ props.row.product_type_id }} </q-td>
          <q-td key="cost" :props="props">{{ props.row.cost }} </q-td>
          <q-td key="address" :props="props">{{ props.row.address }} </q-td>
          <q-td key="created_date" :props="props">{{ props.row.created_date }} </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss" scoped></style>
