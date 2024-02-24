<template>
  <div class="history-layout">
    <div v-for="sale_day in sorted_history">
      <p class="option">{{ sale_day.date.format('DD/MM/YYYY') }}</p>
      <div class="gallery">
        <HistoryItem
          v-for="(history_detail, index) in sale_day.list"
          :total-price="history_detail.total_price"
          :sold-time="dayjs(history_detail.created_at).format('HH:mm')"
          :sale-id="history_detail.sale_uuid"
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
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';

const UserStore = useUserStore()

const history_list = ref([])
const select_history_index = ref()
const sorted_history = computed(() => {
  const history = []
  if (history_list.value.length > 0) {
    history.push({
      date: dayjs(history_list.value[0].created_at),
      list: [history_list.value[0]],
    })
  }
  for (let index = 1; index < history_list.value.length; index++) {
    const current = history_list.value[index];
    const prev = history[history.length - 1];

    const date = dayjs(current.created_at)
    if (date.isSame(prev.date, 'day')) {
      prev.list.push(current)
    } else {
      history.push({
        date: date,
        list: [current],
      })
    }
  }
  return history
})

HistoryList()

watch(() => UserStore.store.store_id, HistoryList)

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
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 1rem;

  > * + * {
    border-top: 1px solid var(--gray-secondary);
  }

  > div {
    padding: 0.5rem 0 1rem 0;

    > div {
      gap: 8px;
      overflow-y: scroll;
      overflow-x: hidden;
      flex: 1 1 0;
    }
  }
}

.option {
  font-size: 16px;
  margin-bottom: 8px;
}
</style>