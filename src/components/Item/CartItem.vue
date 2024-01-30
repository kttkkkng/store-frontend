<template>
  <div class="sale-card">
    <p class="amount">{{ props.amount }}X</p>
    <h1 class="product_name">{{ props.product_name }}</h1>
    <p class="total_price">{{ (props.product_price * props.amount).toLocaleString('en-US') }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['product_name', 'product_price', 'amount'])
</script>

<style lang="scss" scoped>
.sale-card {
  display: flex;
  grid-template-columns: min-content 1fr min-content;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 5px;

  > .amount {
    color: white;
    background-color: #4daa57;
    padding: 0.25rem;
    font-size: 12px;
  }

  > .product_name {
    word-break: break-all;
    max-width: 70%;
  }

  > .total_price {
    margin-left: auto;
  }
}
</style>