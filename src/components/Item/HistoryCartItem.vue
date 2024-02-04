<template>
  <div class="history-sale-card">
    <h1 class="product_name">{{ props.modelValue.product_name }}</h1>
    <div class="price">
      <p>{{ props.modelValue.amount }}X</p>
      <p class="total_price">{{ (props.modelValue.product_price * props.modelValue.amount).toLocaleString('en-US') }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue'])
</script>

<style lang="scss" scoped>
.history-sale-card {
  padding-top: 2px;
  border-top: 1px solid var(--gray-secondary);

  > .product_name {
    margin-bottom: 3px;
    word-break: break-all;
    grid-column: 1 / -1;
  }

  > .price {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.history-sale-card:first-child {
  padding-top: 0;
  border: none;
}
</style>