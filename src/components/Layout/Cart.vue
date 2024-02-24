<template>
  <div class="cart">
    <div>
      <div class="header">
        <p class="text-1">Cart Items</p>
        <i class="pi pi-print text-1" />
      </div>
    </div>
    <div class="product-list space-y-2">
      <CartItem
        v-for="(product, index) in CartStore.product"
        v-model="CartStore.product[index]"
      />
    </div>
    <div>
      <div class="sale-conclude py-2">
        <div class="price-calculation">
          <p class="text-4">Subtotal</p>
          <p class="text-4 ml-auto">{{ CartStore.total_price.toLocaleString('en-US') }}</p>

          <!-- <template v-for="cost in additional_cost" class="flex justify-between">
            <p>{{ cost.cost_name }}</p>
            <InputNumber v-model="cost.amount" input-class="w-1/4 min-w-0 h-5 text-right text-[11px]" placeholder="0"/>
          </template> -->
        </div>
        <div class="total-price flex justify-between">
          <p class="text-3">Total</p>
          <p class="text-3">{{ OrderStore.TotalPriceAfterAddCost(CartStore.total_price, additional_cost).toLocaleString('en-US') }}</p>
        </div>
      </div>
      <button
        class="fill-button w-full text-3"
        :disabled="CartStore.product.filter(each => each.amount).length == 0"
        @click="Checkout"
      >
        Check Out
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/CartStore.js';
import { useOrderStore } from '@/stores/OrderStore.js';
import CartItem from '../Item/CartItem.vue';
import { nextTick, ref } from 'vue';
import { backend } from '@/api/backend.js';
import { useUserStore } from '@/stores/UserStore.js';
import { useModalStore } from '@/stores/ModalStore.js';

const CartStore = useCartStore()
const UserStore = useUserStore()
const OrderStore = useOrderStore()
const ModalStore = useModalStore()

const additional_cost = ref(OrderStore.additional_cost.map(each => ({ ...each })))

async function Checkout () {
  try {
    ModalStore.ShowSlip()
    // await backend.post('/store/sale/checkout', {
    //   store_id: UserStore.store.store_id,
    //   total_price: CartStore.total_price,
    //   sale_product: CartStore.product.map(each => ({
    //     product_id: each.product_id,
    //     product_img: each.product_img,
    //     product_name: each.product_name,
    //     product_price: each.product_price,
    //     amount: each.amount,
    //   })),
    // })

    // CartStore.product = []
  } catch (error) {
    
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  place-items: center;
  border-bottom: 1px solid var(--color-text);
}

.cart {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  grid-template-columns: 100%;
  overflow-y: hidden;
  padding: 1rem 0;
  gap: 8px;
  height: 100%;
  width: min(350px, 40vw);
  border-left: 1px solid var(--gray-secondary);

  > * {
    padding-left: 1rem;
    padding-right: 1rem;
  }
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
  }

  > .total-price {
    border-top: 1px solid var(--color-text);
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }
}
</style>