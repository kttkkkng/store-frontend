<template>
  <div class="category-layout">
    <div>
      <div class="gallery">
        <CategoryItem
          v-for="(category, index) in category_list"
          @click="SelectCategory(index)"
          :category_detail="category"
        />
        <CategoryItem @selected="AddNewCategory" />
      </div>
    </div>
  </div>
  <CategoryManage v-model="category_list[select_category_index]" />
</template>

<script setup>
import { backend } from '@/api/backend.js';
import CategoryItem from '@/components/Item/CategoryItem.vue';
import CategoryManage from '@/components/Layout/CategoryManage.vue';
import { ref } from 'vue';

const category_list = ref([])
const select_category_index = ref()

CategoryList()

async function CategoryList () {
  try {
    const response = await backend.get('/category/list')
    category_list.value = response.data
  } catch (error) {
    
  }
}

function SelectCategory (index) {
  select_category_index.value = index
}

function AddNewCategory () {
  const new_category = {}
  select_category_index.value = category_list.value.length
  category_list.value.push(new_category)
}
</script>

<style scoped>
.category-layout {
  position: relative;
  overflow: hidden;

  > div {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    height: 100%;
  
    > div {
      gap: 8px;
      overflow-y: scroll;
      overflow-x: hidden;
      flex: 1 1 0;
    }
  }
}
</style>