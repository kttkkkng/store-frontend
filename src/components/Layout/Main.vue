<template>
  <div class="layout">
    <Header />
    <RouterView />
    <NavBar />
  </div>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router';
import NavBar from './NavBar.vue';
import Header from './Header.vue';
import { useUserStore } from '@/stores/UserStore.js';
import { backend } from '@/api/backend.js';

const router = useRouter()

const UserStore = useUserStore()

if (!UserStore.refresh_token) router.push({ name: 'login' })

StoreList()

async function StoreList () {
  UserStore.store_list = (await backend.get('/store/list')).data
  const store = UserStore.store_list.find(each => each.store_id == UserStore.store.store_id)
  if (!store) {
    UserStore.store = {
      store_id: 0,
      store_name: 'select store',
    }
  } else {
    UserStore.store = store
  }
}
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: min-content 1fr;
  height: 100vh;
  height: 100svh;
}
</style>