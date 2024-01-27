<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>
<template>
  <div class="">
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
      <q-header elevated :class="$q.dark.isActive ? 'bg-primary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Furor progress task</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500">
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <div class="route">
              <router-link to="/"> Home </router-link>
              <router-link to="/products"> Products </router-link>
            </div>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped>
.route {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}
.route a {
  text-align: center;
  /* background: red; */
  width: 100%;
  padding: 10px 20px;
}
.route a:hover {
  background: rgba(128, 128, 128, 0.301);
  opacity: inherit;
  padding: 10px 20px;
  transition: 0.1s all ease-in;
}
.route a:active {
  color: red;
}
</style>
