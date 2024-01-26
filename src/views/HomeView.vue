<script setup lang="ts">
import { useStore } from 'vuex'
import AddProduct from '../components/product/FormPUTAndDELProduct.vue'
import ProductPageVue from '../pages/ProductPage.vue'

const store = useStore()

const handleDialogPrompt = () => {
  store.commit('setPromptDialog', true)
}
</script>

<template>
  <main>
    <q-btn label="Add Product" outline color="primary" @click="handleDialogPrompt" />
    <div v-if="store.getters.getPromptDialogProducts">
      <AddProduct />
    </div>
    <ProductPageVue />
  </main>
</template>
