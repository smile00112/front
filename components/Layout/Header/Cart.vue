<template>
  <UIButton
    class="header-cart"
    color="yellow"
    @click.prevent="openCart"
  >
    <UIIcon name="cart" />

    <span
      v-if="cartItemsLength"
      class="header-cart__value"
    >
      {{ cartItemsLength }}
      <span />
      {{ cartItemsPrice.toLocaleString() }} ₽
    </span>
    <template v-else>
      Корзина
    </template>
  </UIButton>
</template>

<script setup>
import { useCartStore } from '@/store/cart'
import {ref} from 'vue'
const cartStore = useCartStore()

const { cartItemsLength, cartItemsPrice } = storeToRefs(cartStore)

function openCart() {
  let itemsPrice = process.client ? JSON.parse(localStorage.getItem('cart-balance')) : null
  console.log(itemsPrice, cartItemsPrice.value)
  if (itemsPrice !== cartItemsPrice.value) {
    cartStore.getGiftList()
    process.client ? localStorage.setItem('cart-balance', cartItemsPrice.value) : false
  }
  cartStore.toggleShowCartModal(true)
}
</script>

<style lang="scss" scoped>
.header-cart {
  font-weight: 500;

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    span {
      width: 2px;
      height: 20px;
      background: rgba(0, 0, 0, 0.30);
      border-radius: 20px;
    }
  }
}
</style>