<script setup>
import NavbarCompVue from './components/NavbarComp.vue'
</script>
<template>
  <div class="h-screen">
    <q-layout view="lHh lpr lFf" container style="height: 100vh" class="shadow-2 q-pa-md">
      <NavbarCompVue />
      <q-page-container>
        <q-page class="q-pa-md">
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped></style>
