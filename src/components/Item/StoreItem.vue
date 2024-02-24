<template>
  <div
    class="store-card text-4"
    :edited="props.store_detail?.is_edit"
    :new="props.store_detail && !props.store_detail.store_name"
    @click="emits('selected', props.store_detail)"
  >
    <template v-if="props.store_detail">
      <img v-if="props.store_detail.store_img" :src="props.store_detail.store_img">
      <p class="text-center">{{ props.store_detail.new_store_name ?? props.store_detail.store_name ?? 'new store' }}</p>
    </template>
    <template v-else>
      <div class="flex flex-col">
        <i class="pi pi-plus mx-auto"></i>
        <p class="text-center">Add New Store</p>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps(['store_detail'])
const emits = defineEmits(['selected'])
</script>

<style lang="scss" scoped>
.store-card {
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