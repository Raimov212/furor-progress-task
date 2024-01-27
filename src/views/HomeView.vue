<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const obj = {
  page: store.getters.getPaginationPageObj.page,
  rowsPerPage: store.getters.getPaginationPageObj.rowsPerPage
}

onMounted(async () => {
  await store.dispatch('fetchProduct', obj)
  await store.dispatch('getTypeProducts')
})

computed(() => {
  return store.getters.getAllProducts
})
</script>

<template>
  <main><router-view></router-view></main>
</template>
