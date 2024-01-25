<script setup lang="ts">
import { type Ref, ref } from 'vue'
import AddProduct from '../components/product/AddProductComp.vue'
import ProductPageVue from '../pages/ProductPage.vue'

const prompt: Ref<boolean> = ref(false)
</script>

<template>
  <main>
    <q-btn label="Add Product" outline color="primary" @click="prompt = true" />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">Create product</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <AddProduct />
        </q-card-section>
      </q-card>
    </q-dialog>

    <ProductPageVue />
  </main>
</template>
