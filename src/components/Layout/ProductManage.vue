<template>
  <div class="product">
    <div v-if="product_detail">
      <p class="header">Product Info</p>

      <div>
        <p>Product Index</p>
        <InputNumber v-model="product_detail.new_product_index" @update:model-value="Change" :use-grouping="false" placeholder="product index" />
      </div>
      <div>
        <p>Product Name</p>
        <InputText v-model="product_detail.new_product_name" @update:model-value="Change" placeholder="product name" />
      </div>
      <div>
        <p>Product Price</p>
        <InputNumber v-model="product_detail.new_product_price" @update:model-value="Change" placeholder="product price" />
      </div>
      <div class="space-y-2">
        <p>Categories</p>
        <div v-for="(category, index) in product_detail.new_category" class="category-dropdown">
          <Dropdown
            v-model="product_detail.new_category[index]"
            @update:model-value="Change"
            :options="category_list"
            class="!w-full min-w-0 h-10"
            placeholder="select category"
            option-label="category_name"
            option-value="category_id"
          />
          <i @click="RemoveCategory" class="grow-0 pi pi-trash" style="color: red" />
        </div>
        <button @click="product_detail.new_category.push(null)" class="flex items-center gap-1 text-xs border border-[var(--color-text)] rounded-lg p-2"><i class="pi pi-plus"/>Add Category</button>
      </div>

      <div v-if="product_detail.is_edit && (product_detail.new_product_name || product_detail.new_product_price)">
        <button @click="ResetValue" class="mr-2">Cancel</button>
        <button @click="SaveProductInfo">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { backend } from '@/api/backend.js';
import { ref, watch } from 'vue';

const props = defineProps(['modelValue'])

const product_detail = ref(null)
const category_list = ref([])

CategoryList()

watch(() => props.modelValue, () => {
  product_detail.value = props.modelValue
  if (!product_detail.value.new_product_index) product_detail.value.new_product_index = product_detail.value.product_index
  if (!product_detail.value.new_product_name) product_detail.value.new_product_name = product_detail.value.product_name
  if (!product_detail.value.new_product_price) product_detail.value.new_product_price = product_detail.value.product_price
  if (!product_detail.value.new_category) product_detail.value.new_category = [...(product_detail.value.category ?? [])]
})

function Change () {
  product_detail.value.is_edit = true
}

function RemoveCategory (index) {
  Change()
  product_detail.value.new_category.splice(index, 1)
}

async function SaveProductInfo () {
  try {
    if (product_detail.value) {
      product_detail.value.is_edit = false
      const payload = {
        product_index: product_detail.value.new_product_index,
        product_name: product_detail.value.new_product_name,
        product_price: product_detail.value.new_product_price,
      }
      if (product_detail.value.product_id) {
        await backend.put(`/product/${product_detail.value.product_id}/update`, {
          product: payload,
          add_category: product_detail.value.new_category.filter(each => !product_detail.value.category.includes(each)),
          remove_category: product_detail.value.category.filter(each => !product_detail.value.new_category.includes(each)),
        })
      } else {
        payload.category = product_detail.value.new_category
        const new_product = (await backend.post(
          '/product/create',
          payload,
        )).data
        product_detail.value.product_id = new_product.product_id
      }
      product_detail.value.product_name = product_detail.value.new_product_name
      product_detail.value.is_edit = false
    }
  } catch (error) {
    
  }
}

function ResetValue () {
  product_detail.value = props.modelValue
  product_detail.value.new_product_index = props.modelValue.product_index
  product_detail.value.new_product_name = props.modelValue.product_name
  product_detail.value.new_product_price = props.modelValue.product_price
  product_detail.value.new_category = [...(props.modelValue.category ?? [])]
  product_detail.value.is_edit = false
}

async function CategoryList () {
  try {
    category_list.value = (await backend.get('/category/list')).data
  } catch (error) {
    
  }
}
</script>

<style lang="scss" scoped>
.product {
  width: min(300px, 30vw);
  border-left: 1px solid var(--gray-secondary);
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

.category-dropdown {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr min-content;
  align-items: center;
}
</style>