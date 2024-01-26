<script setup lang="ts">
import { useStore } from 'vuex'
import AddProduct from '../components/product/AddProductComp.vue'
import ProductPageVue from '../pages/ProductPage.vue'

const store = useStore()

const handleDialogPrompt = () => {
  store.commit('setPromptDialog', true)
}
</script>

<template>
  <main>
    <q-btn label="Add Product" outline color="primary" @click="handleDialogPrompt" />
    <!-- <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">Create product</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <AddProduct />
        </q-card-section>
      </q-card>
    </q-dialog> -->
    <div v-if="store.getters.getPromptDialogProducts">
      <AddProduct />
    </div>

    <ProductPageVue />
  </main>
</template>
