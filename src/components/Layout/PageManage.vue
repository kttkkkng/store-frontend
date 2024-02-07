<template>
  <div class="page">
    <div v-if="UserStore.page?.page_id">
      <p class="header">Page Info</p>

      <div>
        <p>Page Name</p>
        <InputText v-model="UserStore.page.new_page_name" @update:model-value="Change" placeholder="page name" />
      </div>

      <div class="product-container">
        <p class="mb-2">Product</p>
        <span class="relative">
          <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600" />
          <InputText v-model="product_search" placeholder="Search" class="pl-10 h-8 w-full" />
        </span>
        <div class="product-list">
            <div v-for="(product, index) in filtered_product_list" class="flex items-center">
              <Checkbox
                v-model="UserStore.page.new_product"
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

      <div v-if="UserStore.page.is_edit && UserStore.page.new_page_name">
        <button @click="ResetValue" class="mr-2">Cancel</button>
        <button @click="SavePageInfo">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { backend } from '@/api/backend.js';
import { useUserStore } from '@/stores/UserStore.js';
import { computed, ref, watch } from 'vue';

const UserStore = useUserStore()

const props = defineProps({
  product_list: {
    type: Array,
    default: [],
  },
})

const product_search = ref('')

const filtered_product_list = computed(() => props.product_list.filter(each => each.product_name.includes(product_search.value)))

watch(() => UserStore.page, () => {
  if (!UserStore.page.new_page_name) UserStore.page.new_page_name = UserStore.page.page_name
  if (!UserStore.page.new_product) UserStore.page.new_product = UserStore.page.product || []
})

function Change () {
  UserStore.page.is_edit = true
}

async function SavePageInfo () {
  try {
    if (UserStore.page) {
      UserStore.page.is_edit = false
      const payload = {
        page_name: UserStore.page.new_page_name
      }
      if (UserStore.page.page_id > 0) {
        await backend.put(`/page/${UserStore.page.page_id}/update`, {
          page: payload,
          product: UserStore.page.new_product,
        })
      } else {
        payload.product = UserStore.page.new_product
        const new_page = (await backend.post('/page/create', payload)).data
        UserStore.page.page_id = new_page.page_id
      }
      UserStore.page.page_name = UserStore.page.new_page_name
      UserStore.page.product = UserStore.page.new_product
      UserStore.page.is_edit = false

      const updated_page = UserStore.page_list.find(each => each.page_id == UserStore.page.page_id)

      if (updated_page) {
        updated_page.page_name = UserStore.page.new_page_name
        updated_page.product = UserStore.page.new_product
      }
    }
  } catch (error) {
    
  }
}

function ResetValue () {
  UserStore.page.new_page_name = UserStore.page.page_name
  UserStore.page.new_product = UserStore.page.product
  UserStore.page.is_edit = false
}
</script>

<style lang="scss" scoped>
.page {
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

.product-list {
  overflow-y: scroll;
  gap: 8px;
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
</style>