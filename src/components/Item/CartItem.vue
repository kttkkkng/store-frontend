<template>
  <div class="sale-card">
    <h1 class="product_name">{{ props.modelValue.product_name }}</h1>
    <div class="price">
      <InputNumber class="max-w-[40%]" input-class="h-8 w-full" v-model="amount" @update:model-value="Update" />
      <p class="total_price">{{ (props.modelValue.product_price * props.modelValue.amount).toLocaleString('en-US') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const amount = ref(props.modelValue?.amount)

watch(() => props.modelValue?.amount || props.modelValue, () => {
  amount.value = props.modelValue.amount
})

function Update (amount) {
  emits('update:modelValue', { ...props.modelValue, amount: amount })
}
</script>

<style lang="scss" scoped>
.sale-card {
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

.sale-card:first-child {
  padding-top: 0;
  border: none;
}
</style>