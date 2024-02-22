<template>
  <ModalsOverlay
    :is-show="isShow"
    position="right"
    :offset="0"
    name="cart"
    @close="cartStore.toggleShowCartModal(false)"
  >
    <div
      :class="[
        'modal-cart',
        { 'modal-cart--empty' : !cartItemsLength }
      ]"
    >
      <a
        href="#"
        class="modal-cart__close"
        @click.prevent="closeModal()"
      >
        <UIIcon name="close" />
      </a>
      
      <div
        v-if="cartItemsLength"
        class="modal-cart__main"
      >
        <div class="modal-cart__header">
          <div class="modal-cart__top">
            <a
              href="#"
              rel="nofollow"
              class="modal-cart__title"
              @click.prevent="closeModal()"
            >
              <UIIcon name="arrow" />
              Корзина
            </a>

            <button
              class="modal-cart__clear"
              @click.prevent="beforeClearCart()"
            >
              <UIIcon name="trash" />
              Очистить
            </button>
          </div>
          <p class="modal-cart__count">
            {{ cartItemsLength }} товара на <span>{{ cartItemsPrice.toLocaleString() }} ₽</span>
          </p>
        </div>

        <div class="modal-cart__content">
          <GiftNotification v-if="couponsList?.length" :coupons="couponsList" />
          <template v-for="(item, i) in cartItems">
            <ModalsCartProduct
                v-if="!item.code"
                :key="i"
                :item="item"
            />
          </template>
        </div>

        <div class="modal-cart__footer">
          <CommonPromocodeBlock
            in-cart
          />

          <!-- <div class="modal-cart-delivery">
            <div class="modal-cart-delivery__icon">
              <UIIcon name="delivery" />
            </div>
            <div class="modal-cart-delivery__list">
              <div class="modal-cart-delivery__line">
                <p class="modal-cart-delivery__value">
                  Доставка
                </p>
                <p class="modal-cart-delivery__value">
                  40-50 мин
                </p>
              </div>
              <div class="modal-cart-delivery__line">
                <p class="modal-cart-delivery__value">
                  250 ₽
                </p>
                <p class="modal-cart-delivery__value modal-cart-delivery__value--gray">
                  До бесплатной 550 ₽
                </p>
              </div>
            </div>
          </div> -->

          <UIButton
            color="yellow"
            class="modal-cart-order-btn"
            @click="submit()"
          >
            Перейти к оформлению
            <span class="modal-cart-order-btn__price">
              <small v-if="+cartItemsRegularPrice !== +cartItemsPrice">
                {{ cartItemsRegularPrice.toLocaleString() }} ₽
              </small>
              {{ cartItemsPrice.toLocaleString() }} ₽
            </span>
          </UIButton>
        </div>
      </div>

      <ModalsCartEmptyBlock
        v-else
        @close="closeModal()"
      />
    </div>

    <LazyModalsAccept
      v-if="commonStore.isShowAcceptModal"
      title="Подтвердите удаление"
      text="Все добавленные товары будут удалены"
      @accept="clearCart()"
    />
  </ModalsOverlay>
</template>

<script setup>
import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common'
import GiftNotification from "~/components/modals/Cart/GiftNotification.vue";

const cartStore = useCartStore()
const commonStore = useCommonStore()

const { cartItems, cartItemsLength, couponsList, cartItemsRegularPrice, cartItemsPrice } = storeToRefs(cartStore)

const isShow = ref(true)

let timer
const closeModal = () => {
  isShow.value = false
}

watch(() => cartItemsPrice.value, () => {
  clearTimeout(timer)

  timer = setTimeout(() => {
    changeGiftStatus()
  }, 2000)
})

function changeGiftStatus() {
  let itemsPrice = process.client ? JSON.parse(localStorage.getItem('cart-balance')) : null
  console.log(itemsPrice, cartItemsPrice.value)
  if (itemsPrice !== cartItemsPrice.value) {
    cartStore.getGiftList()
    process.client ? localStorage.setItem('cart-balance', cartItemsPrice.value) : false
  }
}
const beforeClearCart = () => {
  commonStore.toggleShowAcceptModal(true)
}

const clearCart = () => {
  cartStore.clearCart()
}

const submit = () => {
  closeModal()
  navigateTo('/order')
}
</script>

<style lang="scss" scoped>
.modal-cart {
  position: relative;

  width: 100vw;
  max-width: 512px;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: $grayBg;

  @include mq($bp-small) {
    border-radius: 40px 0 0 40px;
  }

  &--empty {
    justify-content: center;
  }

  &__close {
    display: none;

    @include mq($bp-small) {
      display: block;

      position: absolute;
      left: -60px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__title {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_large;
    font-weight: 700;

    @include mq($bp-small) {
      @include h2;
    }

    span {
      transform: rotate(180deg);

      @include mq($bp-small) {
        display: none;
      }
    }
  }

  &__main {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__header {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding: 20px;

    background: $white;
    border-bottom: 1px solid $grayText2;
    
    @include mq($bp-small) {
      padding: 40px 40px 20px;

      border-radius: 40px 0 0 0;
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__clear {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    @include text_normal;
    font-weight: 500;
    color: $grayText;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $grayText;
      }
    }
  }

  &__count {
    display: none;

    @include mq($bp-small) {
      display: block;

      @include text_big;
      font-weight: 600;

      span {
        color: $orange;
      }
    }
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    padding: 20px;

    overflow-y: auto;

    @include mq($bp-small) {
      padding: 28px 40px;
    }
  }

  &__footer {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding: 20px;

    background: $white;
    border-top: 1px solid $grayText2;
    
    @include mq($bp-small) {
      grid-gap: 20px;

      padding: 20px 40px 40px;
      
      border-radius: 0 0 40px 0;
    }
  }
}

.modal-cart-delivery {
  display: flex;
  align-items: center;
  grid-gap: 18px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 52px;
    height: 52px;

    background: $grayBg;
    border-radius: 14px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 5px;
  }

  &__line {
    display: flex;
    align-items: center;
  }

  &__value {
    display: flex;
    align-items: center;

    @include text_small;
    font-weight: 500;

    &:after {
      content: '';
      display: block;
      width: 3px;
      height: 3px;

      margin: 0 5px;

      background: $grayText;
      border-radius: 50%;
      opacity: 0.3;
    }

    &:last-child {
      &:after {
        display: none;
      }
    }

    &--gray {
      color: $grayText;
    }
  }
}

.modal-cart-order-btn {
  justify-content: space-between;

  padding: 0px 20px;

  font-weight: 500;

  &__price {
    display: flex;
    align-items: center;
    grid-gap: 6px;

    font-weight: 600;

    small {
      @include extra_small;
      color: rgba(0, 0, 0, 0.30);
      text-decoration: line-through;
    }
  }
}
</style>