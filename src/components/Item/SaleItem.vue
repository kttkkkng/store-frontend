<template>
  <div class="sale-card" @click="Add">
    <img v-if="props.product_detail.product_img" :src="props.product_detail.product_img">
    <p class="product-name" :class="{ 'text-center': !props.product_detail.product_img }">
      {{ (props.product_detail.product_index ? props.product_detail.product_index + '. ' : '') + props.product_detail.product_name }}
    </p>
    <p class="product-price">{{ props.product_detail.product_price }} ฿</p>
    <input
      v-show="props.amount"
      ref="input"
      type="number"
      :style="`--length: ${Math.floor(Math.log10(props.amount ?? 1)) + 1}`"
      :value="props.amount"
      @click.stop
      @change="Set"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['product_detail', 'amount'])
const emit = defineEmits(['add', 'set'])

const input = ref()

function Add () {
  emit('add', props.product_detail)
  Animate()
  if (!props.amount) setTimeout(() => input.value.focus(), 50)
}

function Set () {
  emit('set', { ...props.product_detail, amount: input.value.valueAsNumber || 0 })
  Animate()
}

function Animate () {
  input.value.animate([
    { scale: 0.8, offset: 0.3 },
    { scale: 1.2, offset: 0.6 },
    { scale: 1, offset: 1 },
  ], {
    duration: 500,
    iterations: 1,
  })
}
</script>

<style lang="scss" scoped>
.sale-card {
  position: relative;
  display: grid;
  grid-template-rows: 1fr min-content;
  max-width: max(200px, 30%);
  min-height: 100px;
  align-items: center;
  height: fit-content;
  cursor: pointer;
  background-color: white;
  border: 1px solid #DDDDDD;
  border-radius: 12px;
  filter: drop-shadow(0 1px 2px #DDDDDD);

  > img {
    object-fit: cover;
    object-position: center center;
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  > .product-name {
    padding: 0.3rem 0.5rem;
    font-size: 12px;
  }

  > .product-price {
    position: absolute;
    font-size: 11px;
    bottom: 4px;
    right: 4px;
  }

  > input {
    position: absolute;
    background-color: #4daa57;
    color: white;
    top: 10%;
    right: -3px;
    padding: 0 0.5rem;
    border-radius: 12px 0 0 12px;
    width: calc(10px * var(--length) + 20px);
    text-align: center;
  }
}
</style>