<template>
  <div class="cart">
    <template v-if="props.detail">
      <div>
        <div class="header text-1">
          <p>Cart Items</p>
        </div>
      </div>
      <div class="product-list space-y-2 text-4">
        <HistoryCartItem
          v-for="(product, index) in props.detail.sale_product"
          v-model="props.detail.sale_product[index]"
          @update:model-value="value => !value.amount && props.detail.sale_product.splice(index, 1)"
        />
      </div>
      <div>
        <div class="sale-conclude py-2">
          <div class="price-calculation">
            <p class="text-4">Subtotal</p>
            <p class="ml-auto">{{ props.detail.total_price.toLocaleString('en-US') }}</p>

            <!-- <template v-for="cost in additional_cost" class="flex justify-between">
              <p>{{ cost.cost_name }}</p>
              <InputNumber v-model="cost.amount" input-class="w-1/4 min-w-0 h-5 text-right text-[11px]" placeholder="0"/>
            </template> -->
          </div>
          <div class="total-price flex justify-between text-2">
            <p>Total</p>
            <p>{{ OrderStore.TotalPriceAfterAddCost(props.detail.total_price, additional_cost).toLocaleString('en-US') }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useOrderStore } from '@/stores/OrderStore.js';
import HistoryCartItem from '../Item/HistoryCartItem.vue';
import { ref } from 'vue';

const OrderStore = useOrderStore()

const additional_cost = ref(OrderStore.additional_cost.map(each => ({ ...each })))

const props = defineProps(['detail'])
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
  }

  > .total-price {
    border-top: 1px solid var(--color-text);
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }
}
</style>