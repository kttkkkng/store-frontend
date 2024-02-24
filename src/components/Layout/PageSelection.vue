<template>
  <div class="page-selection-tab text-2">
    <p v-for="page in UserStore.page_list" :select="page.page_id == UserStore.page.page_id" @click="UserStore.page = page">{{ page.page_name }}</p>
    <p v-if="$route.name == 'page'" @click="UserStore.page_list.push({ page_id: -1, new_page_name: 'new page', page_name: 'new page' })"><i class="pi pi-plus"/></p>
  </div>
</template>

<script setup>
import { backend } from '@/api/backend.js';
import { useUserStore } from '@/stores/UserStore.js';

const UserStore = useUserStore()

PageList()

async function PageList () {
  try {
    const response = await backend.get('/page/list')
    UserStore.page_list = response.data
  } catch (error) {
    
  }
}
</script>

<style scoped>
.page-selection-tab {
  display: flex;
  overflow-x: auto;
  gap: 4px;
  border-top: 1px solid var(--gray-secondary);

  > p {
    border: 1px solid transparent;
    padding: 1rem 2rem;

    &[select=true] {
      border-top-color: var(--main-primary);
    }
  }
}
</style>