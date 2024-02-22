<template>
  <div :class="['bottom-bar', { 'bottom-bar--full' : cartStore.cartItemsLength }]">
    <a
      href="#"
      rel="nofollow"
      class="bottom-bar__to-top"
      @click.prevent="toTop()"
    >
      <UIIcon name="arrow" />
    </a>

    <transition name="slide-top" mode="out-in">
      <button
        v-if="cartStore.cartItemsLength"
        class="mini-cart"
        @click.prevent="cartStore.toggleShowCartModal(true)"
      >
        <span class="mini-cart__side">
          <UIIcon name="cart" class="mini-cart__icon mini-cart__icon--cart" />
          {{ cartStore.cartItemsPrice.toLocaleString() }} ₽
        </span>

        <!-- <span class="mini-cart__side mini-cart__side--delivery">
          <UIIcon name="delivery" class="mini-cart__icon mini-cart__icon--delivery" />
          48 мин
        </span> -->

        <span class="mini-cart__count">
          {{ cartStore.cartItemsLength }}
        </span>
      </button>
    </transition>

    <CommonCartNotifications class="bottom-bar__notifications" />
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart'

import scrollToEl from '@/utils/scrollToEl'

const cartStore = useCartStore()

const toTop = () => {
  scrollToEl()
}
</script>

<style lang="scss" scoped>
.bottom-bar {
  position: fixed;

  bottom: 20px;
  left: 20px;
  right: 20px;

  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  z-index: 100;
  pointer-events: none;

  @include mq($bp-medium) {
    display: none;
  }

  &__to-top {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 50px;

    padding: 10px;

    background: $white;
    border-radius: 50%;
    box-shadow: 0px -2px 80px 0px rgba(0, 0, 0, 0.20);
    pointer-events: auto;

    .ui-icon {
      transform: rotate(-90deg);
    }
  }
}

.mini-cart {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 10px;

  padding: 7px 7px 7px 20px;

  background: $blackText3;
  border-radius: 14px;
  box-shadow: 0px -2px 80px 0px rgba(0, 0, 0, 0.20);
  pointer-events: auto;

  &__side {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    @include text_normal;
    font-weight: 600;
    color: $white;

    &--delivery {
      color: $grayText;
    }
  }

  &__icon {
    &--cart {
      ::v-deep svg path {
        stroke: $yellow;
      }
    }

    &--delivery {
      ::v-deep svg path {
        fill: $grayText;
      }
    }
  }

  &__count {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 40px;
    height: 40px;

    @include text_small;
    line-height: 18.2px;
    font-weight: 600;
    color: $white;

    background: #383838;
    border-radius: 10px;
  }
}
</style>