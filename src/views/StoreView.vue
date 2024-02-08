<template>
  <div class="store-layout">
    <div>
      <div class="gallery">
        <StoreItem
          v-for="(store, index) in store_list"
          @click="SelectStore(index)"
          :store_detail="store"
        />
        <StoreItem @selected="AddNewStore" />
      </div>
    </div>
  </div>
  <StoreManage v-model="store_list[select_store_index]" />
</template>

<script setup>
import { backend } from '@/api/backend.js';
import StoreItem from '@/components/Item/StoreItem.vue';
import StoreManage from '@/components/Layout/StoreManage.vue';
import { ref } from 'vue';

const store_list = ref([])
const select_store_index = ref()

StoreList()

async function StoreList () {
  try {
    const response = await backend.get('/store/list')
    store_list.value = response.data
  } catch (error) {
    
  }
}

function SelectStore (index) {
  select_store_index.value = index
}

function AddNewStore () {
  const new_store = {}
  select_store_index.value = store_list.value.length
  store_list.value.push(new_store)
}
</script>

<style scoped>
.store-layout {
  position: relative;
  overflow: hidden;

  > div {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    height: 100%;
  
    > div {
      gap: 8px;
      overflow-y: scroll;
      overflow-x: hidden;
      flex: 1 1 0;
    }
  }
}

.option {
  font-size: 20px;
  margin-bottom: 8px;
}
</style>