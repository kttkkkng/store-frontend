<template>
  <div class="store">
    <div v-if="store_detail">
      <div>
        <p class="header text-1">Store Info</p>
      </div>

      <div class="text-3">
        <p>Store Name</p>
        <InputText v-model="store_detail.new_store_name" @update:model-value="Change" placeholder="store name" />
      </div>

      <div class="product-container text-3">
        <p class="mb-2">Product</p>
        <span class="relative">
          <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
          <InputText v-model="product_search" placeholder="Search" class="pl-10 h-8 w-full" />
        </span>
        <div class="product-list">
          <div v-for="(product, index) in filtered_product_list" class="flex items-center">
            <Checkbox
              v-model="store_detail.new_product"
              :inputId="`product_${index}`"
              input-class="w-auto h-auto mt-1"
              :value="product.product_id"
              @update:model-value="Change"
            />
            <label :for="`product_${index}`" class="ml-2">
              {{ product.product_name }}
            </label>
          </div>
        </div>
      </div>

      <div class="ml-auto text-3" v-if="store_detail.is_edit && store_detail.new_store_name">
        <button class="outline-button mr-4" style="--color: red" @click="ResetValue">Cancel</button>
        <button class="fill-button" @click="SaveStoreInfo">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { backend } from '@/api/backend.js';
import { computed, ref, watch } from 'vue';

const props = defineProps(['modelValue'])

const store_detail = ref(null)
const product_list = ref([])
const product_search = ref('')

const filtered_product_list = computed(() => product_list.value.filter(each => each.product_name.includes(product_search.value)))

ProductList()

watch(() => props.modelValue, () => {
  store_detail.value = props.modelValue
  if (!store_detail.value.new_store_name) store_detail.value.new_store_name = store_detail.value.store_name
  if (!store_detail.value.new_product) store_detail.value.new_product = [...(store_detail.value.product ?? [])]
})

function Change () {
  store_detail.value.is_edit = true
}

async function SaveStoreInfo () {
  try {
    if (store_detail.value) {
      store_detail.value.is_edit = false
      const payload = {
        store_name: store_detail.value.new_store_name,
      }
      if (store_detail.value.store_id) {
        await backend.put(`/store/${store_detail.value.store_id}/update`, {
          store: payload,
          add_product: store_detail.value.new_product.filter(each => !store_detail.value.product.includes(each)),
          remove_product: store_detail.value.product.filter(each => !store_detail.value.new_product.includes(each)),
        })
      } else {
        payload.product = store_detail.value.new_product
        const new_store = (await backend.post('/store/create', payload)).data
        store_detail.value.store_id = new_store.store_id
      }
      store_detail.value.store_name = store_detail.value.new_store_name
      store_detail.value.is_edit = false
    }
  } catch (error) {
    
  }
}

function ResetValue () {
  store_detail.value = props.modelValue
  store_detail.value.new_store_name = props.modelValue.store_name
  store_detail.value.new_product = [...(store_detail.value.product ?? [])]
  store_detail.value.is_edit = false
}

async function ProductList () {
  try {
    product_list.value = (await backend.get('/product/list')).data
  } catch (error) {
    
  }
}
</script>

<style lang="scss" scoped>
.store {
  width: min(300px, 30vw);
  border-left: 1px solid var(--gray-secondary);
  overflow-y: auto;
  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    gap: 12px;

    > * {
      padding: 0 1rem;
    }
  }
}

.product-container {
  flex: 0 1 auto;
  overflow-y: hidden;
  padding-bottom: 0.25rem !important;

  > p {
    border-bottom: 1px solid var(--color-text);
    padding-bottom: 0.25rem;
  }
}

.product-list {
  overflow-y: scroll;
  gap: 8px;
}

.header {
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 1rem;
}
</style>