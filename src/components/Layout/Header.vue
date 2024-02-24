<template>
  <div class="header bg-main-primary">
    <div aria-haspopup="true" aria-controls="overlay_menu" class="store-select">
      <i @click="UserStore.open_nav_bar = true" class="pi pi-bars" style="color: white"></i>
      <template v-if="route.name == 'sale' || route.name == 'history'">
        <p v-if="route.name == 'history'" style="color: white">{{ route.name }}:</p>
        <button id="store-name" @click="StoreDropdown" style="color: white">{{ UserStore.store.store_name }}</button>
        <label for="store-name" class="pi pi-angle-down" style="color: white"></label>
      </template>
      <p v-else style="color: white">{{ route.name }}</p>
    </div>
    <Menu ref="menu" :model="UserStore.store_list.map(each => ({ label: each.store_name, command: () => ChangeStore(each) }))" popup/>
    <span class="relative">
      <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
      <InputText placeholder="Search" class="pl-10 h-8" />
    </span>
    <p class="justify-self-end" style="color: white">{{ UserStore.nickname }}</p>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/CartStore.js';
import { useUserStore } from '@/stores/UserStore.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const UserStore = useUserStore()
const CartStore = useCartStore()

const route = useRoute()

const menu = ref()

function ChangeStore (store) {
  UserStore.store = store
  CartStore.product = []
}

function StoreDropdown (event) {
  menu.value.toggle(event)
}
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  padding: 1rem;
  gap: 1rem;
  grid-column: 1 / -1;
}

.store-select {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  align-items: center;
  gap: 12px;
}

.pi {
  font-size: 18px;
}
</style>