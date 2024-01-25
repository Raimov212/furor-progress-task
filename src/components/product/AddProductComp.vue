<script lang="ts">
import { useQuasar } from 'quasar'
import { type Ref, ref } from 'vue'
import { mapActions, useStore } from 'vuex'

export default {
  methods: {
    ...mapActions(['addProducts'])
  },
  setup() {
    const q = useQuasar()
    const store = useStore()

    const name: Ref<string | null> = ref(null)
    const address: Ref<string | null> = ref(null)
    const cost: Ref<number | null> = ref(null)
    const productType: Ref<string> = ref('bir')
    const options = ['bir', 'ikki', 'uch']

    return {
      name,
      cost,
      address,
      productType,
      options,

      //Submit Product
      async onSubmit() {
        const date = new Date()
        const newDate = `${date.getFullYear()}-${date.getMonth() === 0 ? date.getMonth() + '1' : 1 + date.getMonth()}-${date.getUTCDate()}`

        const indices = []
        let idx = options.indexOf(productType.value)
        while (idx != -1) {
          indices.push(idx)
          idx = options.indexOf(productType.value, idx + 1)
        }
        const optionId = parseInt(indices.join(''))

        const obj = {
          product_type_id: optionId,
          name_uz: name.value,
          cost: Number(cost.value),
          address: address.value,
          created_date: newDate
        }

        await store.dispatch('addProducts', obj)

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

        store.commit('setAddLoadingProducts', false)
      },

      onReset() {
        name.value = null
        cost.value = null
        address.value = null
        productType.value = 'bir'
      }
    }
  }
}
</script>

<template>
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
        label="Miqdor"
        lazy-rules
      />

      <q-card-actions align="between" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="Submit" type="submit" color="primary" flat />
      </q-card-actions>
    </q-form>
  </div>
</template>
