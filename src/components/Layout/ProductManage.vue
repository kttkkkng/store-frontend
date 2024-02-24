<template>
  <div class="product">
    <div v-if="product_detail">
      <p class="header text-1">Product Info</p>

      <div class="text-3">
        <p>Product Index</p>
        <InputNumber v-model="product_detail.new_product_index" @update:model-value="Change" :use-grouping="false" placeholder="product index" />
      </div>
      <div class="text-3">
        <p>Product Name</p>
        <InputText v-model="product_detail.new_product_name" @update:model-value="Change" placeholder="product name" />
      </div>
      <div class="text-3">
        <p>Product Price</p>
        <InputNumber v-model="product_detail.new_product_price" @update:model-value="Change" placeholder="product price" />
      </div>
      <div class="text-3">
        <p>Color</p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="color in ['#DDDDDD', '#82c9f4', '#E5DACE', '#E5CEDA', '#DAE5CE', '#DACEE5', '#CEE5DA', '#CEDAE5', '#E5CECE', '#CEE4E5']"
            class="color"
            :select="color == product_detail.new_color"
            @click="Change(); product_detail.new_color = color"
            :style="{ '--background': color }"
          ></div>
        </div>
      </div>
      <div class="text-3">
        <p>Shape</p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="shape in ['square', 'circle', 'round', 'octagon']"
            class="shape"
            :class="shape"
            :select="shape == product_detail.new_shape"
            @click="Change(); product_detail.new_shape = shape"
            :style="{ '--background': product_detail.new_color }"
          ></div>
        </div>
      </div>
      <div class="space-y-2 text-3">
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
        <button @click="product_detail.new_category.push(null)" class="text-4 flex items-center gap-1 border border-[var(--color-text)] rounded-lg p-2">
          <i class="pi pi-plus"/>Add Category
        </button>
      </div>

      <div class="ml-auto text-3" v-if="product_detail.is_edit && (product_detail.new_product_name || product_detail.new_product_price)">
        <button class="outline-button mr-4" style="--color: red" @click="ResetValue">Cancel</button>
        <button class="fill-button" @click="SaveProductInfo">Save</button>
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
  if (!product_detail.value.new_shape) product_detail.value.new_shape = product_detail.value.shape ?? 'square'
  if (!product_detail.value.new_color) product_detail.value.new_color = product_detail.value.color ?? '#DDDDDD'
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
        shape: product_detail.value.new_shape,
        color: product_detail.value.new_color,
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
  product_detail.value.new_shape = props.modelValue.shape ?? 'square'
  product_detail.value.new_color = props.modelValue.color ?? '#DDDDDD'
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

.category-dropdown {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr min-content;
  align-items: center;
}

.shape {
  --padding: 0.75rem;

  position: relative;
  padding: var(--padding);
  width: 60px;
  height: 60px;
  border: 1px solid var(--gray-secondary);
  border-radius: 12px;

  &[select=true] {
    border-color: var(--main-primary);
  }

  &::before {
    content: '';
    position: absolute;
    background-color: var(--background, var(--gray-secondary));
    width: calc(100% - 2 * var(--padding));
    height: calc(100% - 2 * var(--padding));
  }

  &.circle::before {
    border-radius: 100%;
  }

  &.round::before {
    border-radius: 8px;
  }

  &.octagon::before {
    clip-path: polygon(var(--octagon));
  }
}

.color {
  --padding: 0.5rem;
  position: relative;
  padding: var(--padding);
  width: 40px;
  height: 40px;
  border: 1px solid var(--gray-secondary);
  border-radius: 100%;

  &[select=true] {
    border-color: var(--main-primary);
  }

  &::before {
    content: '';
    position: absolute;
    background-color: var(--background);
    border-radius: 100%;
    width: calc(100% - 2 * var(--padding));
    height: calc(100% - 2 * var(--padding));
  }
}
</style>