<template>
  <div class="nav" :open="UserStore.open_nav_bar">
    <ul>
      <li :selected="route.name == 'sale'" @click="GoTo('sale')">Sale</li>
      <li :selected="route.name == 'store'" @click="GoTo('store')">Store</li>
      <li :selected="route.name == 'product'" @click="GoTo('product')">Product</li>
      <li :selected="route.name == 'category'" @click="GoTo('category')">Category</li>
      <!-- <li :selected="route.name == 'user'" @click="GoTo('user')">User</li> -->
    </ul>
  </div>
  <div @click="UserStore.open_nav_bar = false" class="overlay" :open="UserStore.open_nav_bar">
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore.js';
import { useRoute, useRouter } from 'vue-router';

const UserStore = useUserStore()

const router = useRouter()
const route = useRoute()

function GoTo (name) {
  if (route.name != 'name') router.push({ name })
  UserStore.open_nav_bar = false
}
</script>

<style lang="scss" scoped>
.nav {
  position: absolute;
  transform: translateX(-110%);
  height: 100%;
  padding: 0.5rem 0 0.5rem 1rem;
  width: min(200px, 80%);
  background-color: var(--main-background);
  border-right: 1px solid var(--gray-secondary);
  z-index: 101;
  
  transition: all 500ms ease-out;

  &[open=true] {
    transform: translateX(0);
  }

  > ul {
    margin-top: 1rem;

    > li {
      padding: 0.5rem 1rem;
      width: 100%;
      border-radius: 20px 0 0 20px;
      cursor: pointer;

      &:hover {
        background-color: white;
      }

      &[selected=true] {
        color: white;
        background-color: var(--main-tertiary);
      }
    }

    > * + * {
      margin-top: 0.25rem;
    }
  }
}

.overlay {
  position: absolute;
  opacity: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: hsl(0, 0%, 90%);

  transition: all 500ms ease-out;

  &[open=true] {
    opacity: 0.5;
    z-index: 100;
  }
}
</style>