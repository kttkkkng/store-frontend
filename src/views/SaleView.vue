<template>
  <div class="sale-layout">
    <!-- <div @click="select = 'category'" class="category-layout">
      <p class="option">categories: {{ select_category.category_name }}</p>
      <div class="gallery">
        <div
          v-for="category in category_list"
          @click.stop="SelectCategory(category)"
          :class="{ 'selected': select_category == category }"
        >
          {{ category.category_name }}
        </div>
      </div>
    </div> -->
    <div class="product-layout">
      <!-- <p class="option">products</p> -->
      <div class="gallery">
        <SaleItem
          v-for="product in filtered_product_list"
          :product_detail="product"
          :amount="CartStore.FindProduct(product)?.amount"
          @add="CartStore.AddProduct"
          @set="CartStore.SetProduct"
        />
      </div>
    </div>
    <div class="product-page">
      
    </div>
  </div>
  <Cart/>
</template>

<script setup>
import { backend } from '@/api/backend.js';
import SaleItem from '@/components/Item/SaleItem.vue'
import Cart from '@/components/Layout/Cart.vue';
import { useCartStore } from '@/stores/CartStore.js';
import { useUserStore } from '@/stores/UserStore.js';
import { computed, ref } from 'vue';

const CartStore = useCartStore()
const UserStore = useUserStore()

const select = ref('product')

// CategoryList()
SaleList()

const category_list = ref(UserStore.category_list)

const select_category = ref(category_list.value[0])

const product_list = ref(UserStore.product_list)

const filtered_product_list = computed(
  () => !UserStore.store.store_id ? [] : product_list.value
  .filter(each => typeof each.store[UserStore.store.store_id] == 'number')
  .filter(each => !select_category.value.category_id || each.category.includes(select_category.value.category_id))
)

// function SelectCategory (category) {
//   select_category.value = category
//   select.value = 'product'
// }

// async function CategoryList () {
//   try {
//     const response = await backend.get('/category/list')
//     category_list.value = response.data
//     category_list.value.unshift({
//       category_id: null,
//       category_name: 'All',
//     })
//     UserStore.category_list = category_list.value
//     select_category.value = category_list.value[0]
//   } catch (error) {
    
//   }
// }

async function SaleList () {
  try {
    const response = await backend.get('/store/sale')
    product_list.value = response.data
    UserStore.product_list = product_list.value
  } catch (error) {
    
  }
}
</script>

<style lang="scss" scoped>
.sale-layout {
  display: grid;
  grid-template-rows: 1fr min-content;
  overflow: hidden;
}

// .category-layout {
//   display: flex;
//   padding: 1rem;
//   flex-direction: column;
//   height: calc(100% - 40px);
//   background-color: var(--main-background);

//   > div {
//     gap: 8px;
//     overflow-y: scroll;
//     overflow-x: hidden;
//     flex: 1 1 0;

//     > div {
//       padding: 0.5rem;
//       width: 100%;
//       min-width: 100px;
//       min-height: 50px;
//       background-color: white;
//     }
//   }
// }
.product-layout {
  padding: 1rem 0 0 0;
  width: 100%;
  top: 50px;
  display: flex;
  flex-direction: column;

  background-color: white;

  > * {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  > div {
    gap: 8px;
    overflow-y: scroll;
    flex: 1 1 0;
  }
}

.product-page {
  display: flex;
  border-top: 1px solid var(--gray-secondary);
}

// .option {
//   font-size: 20px;
//   margin-bottom: 8px;
// }

// .selected {
//   font-size: 16px;
//   font-weight: 600;
//   color: white;
//   background-color: var(--green-primary) !important;
// }
</style>