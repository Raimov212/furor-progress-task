<script setup>
import { useStore } from 'vuex'
import AddProduct from '../components/product/FormPUTAndDELProduct.vue'
import ProductPageVue from '../pages/ProductPage.vue'

const store = useStore()

const handleDialogPrompt = () => {
  store.commit('setPromptDialog', true)
}
</script>

<template>
  <q-btn label="Add Product" outline color="primary" @click="handleDialogPrompt" />
  <div v-if="store.getters.getPromptDialogProducts">
    <AddProduct />
  </div>
  <ProductPageVue />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
