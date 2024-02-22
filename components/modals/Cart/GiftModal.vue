<template>
  <ModalsOverlay
      :is-show="isShow"
      @close="close()"
  >
    <button
        class="modal-gift__close"
        @click="close()"
    >
      <UIIcon name="close" />
    </button>
    <div class="modal-gift">
      <div class="modal-gift__header">
        <h2 class="modal-gift__title">Вам доступны скидки и подарки</h2>
        <p class="modal-gift__text">Чтобы воспользоваться выберите один из пяти предложенных вариантов</p>
      </div>
      <div class="modal-gift__items">
        <GiftProduct
            v-for="(item, i) in cartStore.couponsList"
            :key="i"
            :item="item"
            @select-gift="getActiveGift"
            :disabled="activeGift.id ? activeGift.id !== item.id : false"
        />
      </div>
      <button class="modal-gift__button" :disabled="!activeGift.code" @click="selectGift">Подтвердить</button>
    </div>
  </ModalsOverlay>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import {useCartStore, Coupon} from "~/store/cart";
import GiftProduct from "~/components/modals/Cart/GiftProduct.vue";
const emit = defineEmits(['closeModal'])
let cartStore = useCartStore()

let isShow = ref(true)
let activeGift = ref({})
const close = () => {
  emit('closeModal', false)
  isShow.value = false
}
function getActiveGift(item: Coupon) {
  activeGift.value = item
}
function selectGift() {
  cartStore.setActiveCoupon({
    amount: activeGift.value.amount,
    code: activeGift.value.code,
    discount_type: activeGift.value.discount_type
  })
  close()
}

</script>
<style lang="scss" scoped>
.modal-gift {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  grid-gap: 50px;

  padding: 20px;

  background: $white;

  @include mq($bp-small) {
    min-height: auto;
    max-width: 560px;

    padding: 50px 60px;

    border-radius: 40px;
  }
  &__header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__close {
    position: absolute;
    right: 60px;
    top: 50px;
    z-index: 2;
    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $blackText;
      }
    }
  }

  &__title {
    @include text_large;
    font-weight: bold;
  }

  &__text {
    @include text_small;
    color: $black;
  }
  &__button {
    background-color: $yellow;
    @include text_normal;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 14px;
    margin-top: 10px;
    height: 48px;
    cursor: pointer;
    &:disabled {
      background-color: $yellowLightSecondary;
    }
  }
}
</style>