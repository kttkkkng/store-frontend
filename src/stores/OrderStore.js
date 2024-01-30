import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    additional_cost: [
      { cost_name: 'Tax (%)', type: 'percent', suffix: '%' },
      { cost_name: 'Fee', type: 'value', suffix: '฿' },
      { cost_name: 'Discount (%)', type: 'discount_percent', suffix: '%' },
      { cost_name: 'Discount', type: 'discount_value', suffix: '฿' },
    ],
    failed_order: [],
  }),
  actions: {
    AddOrder (order) {
      this.failed_order.push(order)
    },
    TotalPriceAfterAddCost (total_price, cost) {
      let total = total_price
      for (let index = 0; index < cost.length; index++) {
        const each = cost[index];
        if (!each.amount) continue
        if (each.type == 'percent') {
          total += each.amount * total_price / 100
        } else if (each.type == 'value') {
          total += each.amount
        } else if (each.type == 'discount_percent') {
          total -= each.amount * total_price / 100
        } else if (each.type == 'discount_value') {
          total -= each.amount
        }
      }
      return total
    },
  },
})
