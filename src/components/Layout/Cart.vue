<template>
  <div class="cart">
    <div class="header">
      <p>Cart Items</p>
    </div>
    <div class="product-list space-y-3">
      <CartItem
        v-for="product in CartStore.product"
        :amount="product.amount"
        :product_name="product.product_name"
        :product_price="product.product_price"
      />
    </div>
    <div class="sale-conclude py-2">
      <div class="price-calculation">
        <p>Subtotal</p>
        <p class="ml-auto pr-3">{{ CartStore.total_price.toLocaleString('en-US') }}</p>

        <template v-for="cost in additional_cost" class="flex justify-between">
          <p>{{ cost.cost_name }}</p>
          <InputNumber v-model="cost.amount" input-class="w-1/4 min-w-0 h-5 text-right text-[11px]" placeholder="0"/>
        </template>
      </div>
      <div class="total-price flex justify-between">
        <p>Total</p>
        <p>{{ OrderStore.TotalPriceAfterAddCost(CartStore.total_price, additional_cost).toLocaleString('en-US') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/CartStore.js';
import { useOrderStore } from '@/stores/OrderStore.js';
import CartItem from '../Item/CartItem.vue';
import { ref } from 'vue';

const CartStore = useCartStore()
const OrderStore = useOrderStore()

const additional_cost = ref(OrderStore.additional_cost.map(each => ({ ...each })))
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid var(--color-text);
}

.cart {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  grid-template-columns: 100%;
  overflow-y: hidden;
  padding: 1rem;
  gap: 8px;
  height: 100%;
  width: min(300px, 30vw);
  border-left: 1px solid var(--gray-secondary);
}

.product-list {
  flex: 0 1 auto;
  overflow-y: auto;
}

.sale-conclude {
  border-top: 1px solid var(--color-text);

  > .price-calculation {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4px;
    align-items: center;
    
    > p {
      font-size: 10px;
    }
  }

  > .total-price {
    border-top: 1px solid var(--color-text);
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }
}
</style>