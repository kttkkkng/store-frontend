<template>
  <div
    class="product-card"
  >
    <template v-if="props.product_detail.product_img">
      <img :src="props.product_detail.product_img">
      <p class="text-left">
        {{ props.product_detail.product_name }}
      </p>
    </template>
    <p v-else class="text-center">
      {{ props.product_detail.product_name }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps(['product_detail'])
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  display: grid;
  grid-template-rows: 1fr min-content;
  aspect-ratio: 1;
  cursor: pointer;
  filter: drop-shadow(0 1px 2px #DDDDDD);
  background-color: white;
  border-radius: 12px;
  border: 1px solid #DDDDDD;
  align-items: center;
  overflow: hidden;

  &[select=true] {
    border-color: var(--main-primary);
  }
}
</style>