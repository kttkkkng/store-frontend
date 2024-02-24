<template>
  <div class="history-card text-4">
    <p class="detail">{{ props.soldTime }}</p>
    <p class="detail">{{ props.totalPrice }} ฿</p>
    <p class="sale-id">{{ props.saleId }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['totalPrice', 'soldTime', 'saleId'])
</script>

<style lang="scss" scoped>
.history-card {
  position: relative;
  display: grid;
  aspect-ratio: 1;
  align-items: center;
  place-content: center;
  height: fit-content;
  cursor: pointer;
  background-color: white;
  border: 1px solid #DDDDDD;
  border-radius: 12px;
  filter: drop-shadow(0 1px 2px #DDDDDD);

  > .detail {
    padding: 0.3rem 0.5rem;
    text-align: center;
  }

  > .sale-id {
    position: absolute;
    text-align: right;
    font-size: 5px;
    top: 3px;
    right: 3px;
  }
}
</style>