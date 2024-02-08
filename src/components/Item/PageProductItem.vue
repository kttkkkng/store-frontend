<template>
  <div
    class="product-item"
    :style="{ '--background': props.product_detail.color }"
    :class="props.product_detail.shape"
  >
    <template v-if="props.product_detail.product_img">
      <img :src="props.product_detail.product_img">
    </template>
    <p class="text-center">
      {{ props.product_detail.product_name }}
    </p>
    <i class="pi pi-check" />
  </div>
</template>

<script setup>
const props = defineProps(['product_detail'])
</script>

<style lang="scss" scoped>
.product-item {
  position: relative;

  .pi-check {
    display: none;
    position: absolute;
    color: white;
    background-color: var(--main-primary);
    border-radius: 100%;
    padding: 0.5rem;
    top: 10%;
    right: -3px;
  }

  &[select=true] {
    .pi-check {
      display: block;
    }
  }
}
</style>