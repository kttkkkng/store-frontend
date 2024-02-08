<template>
  <div class="history-layout">
    <div>
      <div class="gallery">
        <HistoryItem
          v-for="(history, index) in history_list" :total-price="history.total_price"
          @click="select_history_index = index"
        />
      </div>
    </div>
  </div>
  <SaleHistoryDetail :detail="history_list[select_history_index]" />
</template>

<script setup>
import { backend } from '@/api/backend.js';
import HistoryItem from '@/components/Item/HistoryItem.vue';
import SaleHistoryDetail from '@/components/Layout/SaleHistoryDetail.vue';
import { useUserStore } from '@/stores/UserStore.js';
import { ref } from 'vue';

const UserStore = useUserStore()

const history_list = ref([])
const select_history_index = ref()

HistoryList()

async function HistoryList () {
  try {
    const response = await backend.get(`/store/${UserStore.store.store_id || 'all'}/sale/history`)
    history_list.value = response.data
  } catch (error) {
    
  }
}
</script>

<style scoped>
.history-layout {
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