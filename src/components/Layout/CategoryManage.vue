<template>
  <div class="category">
    <div v-if="category_detail">
      <p class="header">Category Info</p>

      <div>
        <p>Category Name</p>
        <InputText v-model="category_detail.new_category_name" @update:model-value="Change" placeholder="category name" />
      </div>

      <div class="ml-auto" v-if="category_detail.is_edit && category_detail.new_category_name">
        <button class="outline-button mr-4" style="--color: red" @click="ResetValue">Cancel</button>
        <button class="fill-button" @click="SaveCategoryInfo">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { backend } from '@/api/backend.js';
import { ref, watch } from 'vue';

const props = defineProps(['modelValue'])

const category_detail = ref(null)

watch(() => props.modelValue, () => {
  category_detail.value = props.modelValue
  if (!category_detail.value.new_category_name) category_detail.value.new_category_name = category_detail.value.category_name
})

function Change () {
  category_detail.value.is_edit = true
}

async function SaveCategoryInfo () {
  try {
    if (category_detail.value) {
      category_detail.value.is_edit = false
      if (category_detail.value.category_id) {
        await backend.put(`/category/${category_detail.value.category_id}/update`, { category_name: category_detail.value.new_category_name })
      } else {
        const new_category = (await backend.post('/category/create', { category_name: category_detail.value.new_category_name })).data
        category_detail.value.category_id = new_category.category_id
      }
      category_detail.value.category_name = category_detail.value.new_category_name
      category_detail.value.is_edit = false
    }
  } catch (error) {
    
  }
}

function ResetValue () {
  category_detail.value = props.modelValue
  category_detail.value.new_category_name = props.modelValue.category_name
  category_detail.value.is_edit = false
}
</script>

<style lang="scss" scoped>
.category {
  width: min(300px, 30vw);
  border-left: 1px solid var(--gray-secondary);
  overflow-y: auto;
  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 8px;
  }
}

.header {
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 1rem;
}
</style>