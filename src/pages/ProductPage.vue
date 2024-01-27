<script lang="ts">
import { defineComponent, ref, onMounted, computed, type Ref, watch, onUpdated } from 'vue'
import type { Product } from '../types/product'
import { useStore } from 'vuex'
import { exportFile, useQuasar } from 'quasar'
import AddProductComp from '../components/product/FormPUTAndDELProduct.vue'
import { columns } from '../data/productsTableColumns'
import { wrapCsvValue } from '../utils/tableCSVFile'

export default defineComponent({
  name: 'product-page',
  components: {
    AddProductComp
  },

  setup() {
    const store = useStore()
    const q = useQuasar()

    const loading_products = store.getters.getLoadingProducts

    const selected: Ref<Product | undefined> = ref()
    const tableRef = ref()
    const pagination = ref({
      page: store.getters.getPaginationPageObj.page,
      rowsPerPage: store.getters.getPaginationPageObj.rowsPerPage,
      rowsNumber: store.getters.getAllProducts.length
    })

    console.log(store.getters.getAllProducts)

    // console.log(loading_products)
    computed(() => {
      return store.getters.getLoadingProducts
    })

    computed(() => {
      return store.getters.getAllProducts
    })

    console.log(store.state.product.products)

    // pagination.value.page = store.getters.getPaginationPageObj.page
    // pagination.value.rowsPerPage = store.getters.getPaginationPageObj.rowsPerPage

    pagination.value.rowsNumber = store.getters.getAllProducts.length

    const handleRequest = (props: { pagination: any }) => {
      let obj = {
        page: props.pagination.page,
        rowsPerPage: props.pagination.rowsPerPage
      }
      store.dispatch('fetchProduct', obj)
      console.log('page', props.pagination)
    }

    return {
      columns,
      selected,
      store,
      tableRef,
      loading_products,
      pagination,
      handleRequest,

      //Export CSV FILE
      exportTable() {
        // naive encoding to csv format
        const content = [columns.map((col) => wrapCsvValue(col.label, undefined, undefined))]
          .concat(
            store.getters.getAllProducts.map((row: { [x: string]: string }) =>
              columns
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === 'function'
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format,
                    row
                  )
                )
                .join(',')
            )
          )
          .join('\r\n')

        const status = exportFile('table-export.csv', content, 'text/csv')

        if (status !== true) {
          q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        } else {
          q.notify({
            message: 'Csv file download',
            color: 'green-4',
            icon: 'done'
          })
        }
      },

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
        store.commit('setSelectedProduct', item)
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
      :loading="loading_products"
      ref="tableRef"
      title="Products table"
      :rows="store.getters.getAllProducts"
      :columns="columns"
      dark
      selection="single"
      v-model:pagination="pagination"
      @request="handleRequest"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export products to csv file"
          no-caps
          @click="exportTable"
        />
      </template>
      <template #body="props">
        <!-- visible table product -->
        <q-tr :props="props">
          <q-td>
            <q-btn
              flat
              round
              :icon="props.expand ? 'remove' : 'add'"
              color="info"
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

        <!-- update table product -->
        <q-tr v-show="props.expand">
          <q-td>
            <q-btn
              flat
              round
              @click="handleRowsDelete(props.row)"
              :icon="props.expand ? 'delete' : ''"
              color="negative"
            />
            <q-btn
              flat
              round
              @click="handleRowsEdit(props.row)"
              :icon="props.expand ? 'edit' : ''"
              color="warning"
            />
            <div v-if="store.getters.getPromptDialogProducts">
              <AddProductComp />
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
