import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    product: [],
  }),
  getters: {
    total_price (state) {
      let total_price = 0
      for (let index = 0; index < state.product.length; index++) {
        const product = state.product[index];
        total_price += product.amount * product.product_price
      }
      return total_price
    },
  },
  actions: {
    FindProduct (product_detail) {
      return this.product.find(each => each.product_id == product_detail.product_id)
    },
    AddProduct (product_detail) {
      const product = this.product.find(each => each.product_id == product_detail.product_id)

      if (product) {
        product.amount += 1
      } else {
        this.product.push({
          ...product_detail,
          amount: 1,
        })
      }
    },
    SetProduct (product_detail) {
      const index = this.product.findIndex(each => each.product_id == product_detail.product_id)
  
      if (index != -1) {
        if (!product_detail.amount) {
          this.product.splice(index, 1)
        } else {
          this.product[index] = product_detail
        }
      } else {
        this.product.push(product_detail)
      }
    },
  },
})
