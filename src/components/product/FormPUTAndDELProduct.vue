<script lang="ts">
import { useQuasar } from 'quasar'
import { type Ref, ref, computed } from 'vue'
import { mapActions, useStore } from 'vuex'
import type { GetProductTypes } from '../../types/product'
// import InputTextUIComp from '../../ui/InputTextUiComp.vue'

export default {
  methods: {
    ...mapActions(['addProducts'])
  },

  // components: {
  //   InputTextUIComp
  // },

  setup() {
    const q = useQuasar()
    const store = useStore()

    const options: string[] = []

    const selectItem = store.getters.getSelectedProduct
    const product_type: GetProductTypes[] = store.getters.getProductsType

    const name: Ref<string | null> = ref(null)
    const address: Ref<string | null> = ref(null)
    const cost: Ref<number | null> = ref(null)
    const productType: Ref<number | null> = ref(null)

    computed(() => {
      return selectItem
    })

    product_type.map((item) => options.push(item.name_uz))

    console.log('selectItem', selectItem)
    if (selectItem) {
      name.value = selectItem?.name_uz
      address.value = selectItem?.address
      cost.value = selectItem?.cost
      productType.value = selectItem?.product_type_id
    }

    return {
      name,
      cost,
      address,
      productType,
      options,
      store,
      textTitle: selectItem,
      product_type,

      //HANDLE CLOSE DIALOG
      handleCloseDialog() {
        store.commit('setSelectedProduct', undefined)
        name.value = null
        cost.value = null
        address.value = null
        productType.value = null
        store.commit('setPromptDialog', false)
      },

      //Submit Product
      async onSubmit() {
        const date = new Date()
        const newDate = `${date.getFullYear()}-${date.getMonth() === 0 ? date.getMonth() + '1' : 1 + date.getMonth()}-${date.getUTCDate()}`

        let optionId: number | null = null
        product_type.forEach((item) => {
          if (item.id === productType.value) {
            optionId = item.id
          }
        })

        const obj = {
          product_type_id: optionId,
          name_uz: name.value,
          cost: Number(cost.value),
          address: address.value,
          created_date: newDate
        }

        console.log('result', obj)

        //UPDATE PRODUCTS STORE FUNCTION
        if (selectItem) {
          await store.dispatch('updateProducts', {
            id: selectItem.id,
            obj
          })
        } else {
          await store.dispatch('addProducts', obj)
        }

        //ADD PRODUCT OR UPDATE PRODUCT TO PRODUCTS LIST
        if (store.getters.getAddLoadingProducts) {
          q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Product is success full'
          })
        } else {
          q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: `Do not created product!!!`
          })
        }

        store.commit('setAddLoadingProducts', false)
      },

      onReset() {
        name.value = null
        cost.value = null
        address.value = null
        productType.value = null
      }
    }
  }
}
</script>

<template>
  <q-dialog v-model="store.getters.getPromptDialogProducts" persistent>
    <q-card style="min-width: 450px">
      <q-card-section>
        <div v-if="textTitle" class="text-h6">Update product</div>
        <div v-else class="text-h6">Create product</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <!-- <InputTextUIComp :v-model="name" :label="'Ism'" /> -->
            <q-input
              filled
              v-model="name"
              label="Ism"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || `Ism bo'sh bo'lishi mumkin emas! `]"
            />
            <q-input
              filled
              v-model="address"
              label="Yashash joyi"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || `Manzil bo'sh bo'lishi mumkin emas!`]"
            />

            <q-input
              filled
              type="number"
              v-model="cost"
              label="Miqdor"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || `Miqdor bo'sh bo'lishi mumkin emas!`,
                (val) => (val > 0 && val < 10000) || `1-10000 gacha bo'lishi kerak`
              ]"
            />
            <q-select
              filled
              type="number"
              :options="options"
              v-model="productType"
              label="Type"
              lazy-rules
              :rules="[(val) => val || `Type bo'sh bo'lishi mumkin emas`]"
            />

            <q-card-actions align="between" class="text-primary">
              <q-btn flat label="Cancel" @click="handleCloseDialog" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              <q-btn label="Submit" type="submit" color="primary" flat />
            </q-card-actions>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
