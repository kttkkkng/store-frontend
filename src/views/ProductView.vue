<template>
  <div class="product-layout">
    <div>
      <p class="option">product</p>
      <div class="gallery">
        <ProductItem
          v-for="(product, index) in product_list"
          @click="SelectProduct(index)"
          :product_detail="product"
        />
        <ProductItem @selected="AddNewProduct" />
      </div>
    </div>
  </div>
  <ProductManage v-model="product_list[select_product_index]" />
</template>

<script setup>
import { backend } from '@/api/backend.js';
import ProductItem from '@/components/Item/ProductItem.vue';
import ProductManage from '@/components/Layout/ProductManage.vue';
import { ref } from 'vue';

const product_list = ref([])
const select_product_index = ref()

ProductList()

async function ProductList () {
  try {
    const response = await backend.get('/product/list')
    product_list.value = response.data
  } catch (error) {
    
  }
}

function SelectProduct (index) {
  select_product_index.value = index
}

function AddNewProduct () {
  const new_product = {}
  select_product_index.value = product_list.value.length
  product_list.value.push(new_product)
}
</script>

<style scoped>
.product-layout {
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

.option {
  font-size: 20px;
  margin-bottom: 8px;
}
</style>