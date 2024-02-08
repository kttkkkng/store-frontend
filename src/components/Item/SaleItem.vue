<template>
  <div
    class="product-item"
    :style="{ '--background': props.product_detail.color }"
    :class="props.product_detail.shape"
    @click="Add"
  >
    <img v-if="props.product_detail.product_img" :src="props.product_detail.product_img">
    <p class="product-name">
      {{ (props.product_detail.product_index ? props.product_detail.product_index + '. ' : '') + props.product_detail.product_name }}
      <br/>
      {{ props.product_detail.product_price }} ฿
    </p>
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
.product-item {
  position: relative;

  > img {
    object-fit: cover;
    object-position: center center;
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  > .product-name {
    text-align: center;
    padding: 0.3rem 0.5rem;
    font-size: 12px;
  }

  > input {
    position: absolute;
    background-color: var(--main-primary);
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