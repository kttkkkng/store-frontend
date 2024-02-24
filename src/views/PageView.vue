<template>
  <div class="page-layout">
    <div>
      <div class="gallery">
        <PageProductItem
          v-for="(product, index) in page_product_list"
          :product_detail="product"
          :select="index == select_product_index"
          @click="SelectProduct(index)"
        />
      </div>
      <PageSelection />
    </div>
  </div>
  <PageManage :product_list="product_list" />
</template>

<script setup>
import { backend } from '@/api/backend.js';
import PageProductItem from '@/components/Item/PageProductItem.vue';
import PageManage from '@/components/Layout/PageManage.vue';
import PageSelection from '@/components/Layout/PageSelection.vue';
import { useUserStore } from '@/stores/UserStore.js';
import { computed, ref } from 'vue';

const UserStore = useUserStore()

UserStore.page = {
  page_id: 0,
  page_name: '',
}

const product_list = ref([])
const product = ref({})

const select_product_index = ref()

const page_product_list = computed(() => {
  if (!UserStore.page.new_product) return []
  return UserStore.page.new_product
  .filter(each => product.value[each])
  .map(each => product.value[each])
})

ProductList()

async function ProductList () {
  try {
    const response = await backend.get('/product/list')
    product_list.value = response.data
    product.value = Object.fromEntries(response.data.map(each => [each.product_id, each]))
  } catch (error) {
    
  }
}

function SelectProduct (index) {
  if (index == select_product_index.value) {
    select_product_index.value = null
  } else if (typeof select_product_index.value == 'number') {
    const deleted = UserStore.page.new_product.splice(select_product_index.value, 1)
    UserStore.page.new_product.splice(index - (index > select_product_index.value), 0, ...deleted)
    UserStore.page.is_edit = true
    select_product_index.value = null
  } else {
    select_product_index.value = index
  }
}
</script>

<style scoped>
.page-layout {
  position: relative;
  overflow: hidden;

  > div {
    display: grid;
    grid-template-rows: 1fr min-content;
    flex-direction: column;
    height: 100%;
  
    > .gallery {
      padding: 1rem 1rem 0 1rem;
      gap: 8px;
      overflow-y: auto;
    }
  }
}
</style>