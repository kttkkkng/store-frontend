<template>
  <div
    class="category-card"
    :edited="props.category_detail?.is_edit"
    :new="props.category_detail && !props.category_detail.category_name"
    @click="emits('selected', props.category_detail)"
  >
    <template v-if="props.category_detail">
      <img v-if="props.category_detail.category_img" :src="props.category_detail.category_img">
      <p class="text-center">{{ props.category_detail.new_category_name ?? props.category_detail.category_name ?? 'new category' }}</p>
    </template>
    <template v-else>
      <div class="flex flex-col">
        <i class="pi pi-plus mx-auto"></i>
        <p class="text-center">Add New Category</p>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps(['category_detail'])
const emits = defineEmits(['selected'])
</script>

<style lang="scss" scoped>
.category-card {
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