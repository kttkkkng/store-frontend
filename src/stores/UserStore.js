import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    store: {
      store_id: 0,
      store_name: 'select store',
    },
    store_list: [],
    product_list: [],
    category_list: [
      {
        category_id: null,
        category_name: 'All',
      },
    ],
    page: {
      page_id: 0,
      page_name: '',
      product: [],
    },
    page_list: [],
    company_id: 2,
    nickname: 'user',
    search: '',
    access_token: '',
    refresh_token: '',
    open_nav_bar: false,
  }),
  persist: true,
})
