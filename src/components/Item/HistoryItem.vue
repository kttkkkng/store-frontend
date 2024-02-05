<template>
  <div class="history-card">
    <p class="total-price">
      {{ props.totalPrice }} ฿
    </p>
    <!-- <p class="sale-time">{{ props }}</p> -->
  </div>
</template>

<script setup>
const props = defineProps(['totalPrice'])
</script>

<style lang="scss" scoped>
.history-card {
  position: relative;
  display: grid;
  grid-template-rows: 1fr min-content;
  aspect-ratio: 1;
  align-items: center;
  height: fit-content;
  cursor: pointer;
  background-color: white;
  border: 1px solid #DDDDDD;
  border-radius: 12px;
  filter: drop-shadow(0 1px 2px #DDDDDD);

  > .total-price {
    padding: 0.3rem 0.5rem;
    font-size: 12px;
    text-align: center;
  }

  > .sale-time {
    position: absolute;
    font-size: 11px;
    bottom: 4px;
    right: 4px;
  }
}
</style>