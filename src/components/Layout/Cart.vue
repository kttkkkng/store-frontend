<template>
  <div class="cart">
    <div>
      <div class="header">
        <p>Cart Items</p>
      </div>
    </div>
    <div class="product-list space-y-2">
      <CartItem
        v-for="(product, index) in CartStore.product"
        v-model="CartStore.product[index]"
        @update:model-value="value => !value.amount && CartStore.product.splice(index, 1)"
      />
    </div>
    <div>
      <div class="sale-conclude py-2">
        <div class="price-calculation">
          <p>Subtotal</p>
          <p class="ml-auto">{{ CartStore.total_price.toLocaleString('en-US') }}</p>

          <!-- <template v-for="cost in additional_cost" class="flex justify-between">
            <p>{{ cost.cost_name }}</p>
            <InputNumber v-model="cost.amount" input-class="w-1/4 min-w-0 h-5 text-right text-[11px]" placeholder="0"/>
          </template> -->
        </div>
        <div class="total-price flex justify-between">
          <p>Total</p>
          <p>{{ OrderStore.TotalPriceAfterAddCost(CartStore.total_price, additional_cost).toLocaleString('en-US') }}</p>
        </div>
      </div>
      <FillButton
        class="w-full"
        :disabled="CartStore.product.length == 0"
        @click="Checkout"
      >
        Check Out
      </FillButton>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/CartStore.js';
import { useOrderStore } from '@/stores/OrderStore.js';
import CartItem from '../Item/CartItem.vue';
import FillButton from '@/components/Button/FillButton.vue';
import { ref } from 'vue';
import { backend } from '@/api/backend.js';
import { useUserStore } from '@/stores/UserStore.js';

const CartStore = useCartStore()
const UserStore = useUserStore()
const OrderStore = useOrderStore()

const additional_cost = ref(OrderStore.additional_cost.map(each => ({ ...each })))

async function Checkout () {
  try {
    await backend.post('/store/sale/checkout', {
      store_id: UserStore.store.store_id,
      totalprice: CartStore.total_price,
      sale_product: CartStore.product.map(each => ({
        product_id: each.product_id,
        product_img: each.product_img,
        product_name: each.product_name,
        product_price: each.product_price,
        amount: each.amount,
      })),
    })

    CartStore.product = []
  } catch (error) {
    
  }
}
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
  padding: 1rem 0;
  gap: 8px;
  height: 100%;
  width: min(300px, 50vw);
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