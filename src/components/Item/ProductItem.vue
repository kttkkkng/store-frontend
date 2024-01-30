<template>
  <div
    class="product-card"
    :edited="props.product_detail?.is_edit"
    :new="props.product_detail && !props.product_detail.product_name"
    @click="emits('selected', props.product_detail)"
  >
    <template v-if="props.product_detail">
      <template v-if="props.product_detail.product_img">
        <img :src="props.product_detail.product_img">
        <p class="text-left">
          {{ product_name }}
        </p>
      </template>
      <p v-else class="text-center">
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
.product-card {
  position: relative;
  display: grid;
  grid-template-rows: 1fr min-content;
  max-width: max(200px, 30%);
  min-height: 100px;
  cursor: pointer;
  filter: drop-shadow(0 1px 2px #DDDDDD);
  background-color: white;
  border-radius: 12px;
  border: 1px solid #DDDDDD;
  align-items: center;
  overflow: hidden;

  &::before {
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
    &::before {
      color: white;
      background-color: var(--main-primary);
      display: block;
      content: 'edited';
    }
  }

  &[new=true] {
    &::before {
      background-color: var(--yellow-primary);
      display: block;
      content: 'new';
    }
  }
}
</style>