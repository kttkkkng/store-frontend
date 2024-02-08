<template>
  <div
    class="product-item"
    :edited="props.product_detail?.is_edit"
    :new="props.product_detail && !props.product_detail.product_name"
    :style="{ '--background': props.product_detail?.new_color || props.product_detail?.color }"
    :class="props.product_detail?.new_shape || props.product_detail?.shape"
    @click="emits('selected', props.product_detail)"
  >
    <template v-if="props.product_detail">
      <template v-if="props.product_detail.product_img">
        <img :src="props.product_detail.product_img">
      </template>
      <p class="text-center">
        {{ product_name }}
      </p>
    </template>
    <template v-else>
      <div class="flex flex-col">
        <i class="pi pi-plus mx-auto"></i>
        <p class="text-center">Add New Product</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['product_detail'])
const emits = defineEmits(['selected'])

const product_name = computed(() => {
  let name = ''
  if (props.product_detail.new_product_index ?? props.product_detail.product_index) {
    name = props.product_detail.new_product_index ?? props.product_detail.product_index
    name += '. '
  }
  name += props.product_detail.new_product_name ?? props.product_detail.product_name ?? 'new product'
  return name
})
</script>

<style lang="scss" scoped>
.product-item {
  position: relative;

  &::after {
    display: hidden;
    position: absolute;
    text-align: center;
    top: 0;
    right: 0;
    width: 60px;
    padding: 1px 4px;
    font-size: 13px;
    border-bottom-left-radius: 12px;
  }

  &[edited=true] {
    &::after {
      color: white;
      background-color: var(--main-primary);
      display: block;
      content: 'edited';
    }
  }

  &[new=true] {
    &::after {
      background-color: var(--yellow-primary);
      display: block;
      content: 'new';
    }
  }
}
</style>