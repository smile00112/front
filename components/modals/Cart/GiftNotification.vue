<template>
  <div class="modal-cart-gift">
    <button
      class="modal-cart-gift__remove"
    >
      <UIIcon name="close" @click="clearCouponList" />
    </button>
    <div class="modal-cart-gift__main">
      <div class="modal-cart-gift__image">
        <img v-if="item" :src="item.image" :alt="item.image" />
        <UIIcon name="gift" v-else />
      </div>
      <div class="modal-cart-gift__content">
        <div class="modal-cart-gift__top">
          <p class="modal-cart-gift__title">
            {{ item ? item.description : 'Вам доступна скидка или подарок!' }}
          </p>
          <p class="modal-cart-gift__subtitle">{{ item ? 'Вы выбрали 1 подарок из предложенных вариантов' : `Вам доступны ${coupons.length} подарка или скидка. Выберите 1 из предложенных вариантов.` }}</p>
        </div>
        <button class="modal-cart-gift__button-change" v-if="item" @click="removeGiftItem" >Изменить выбор</button>
        <button class="modal-cart-gift__button" v-else @click="changeStatusGiftModal(true)" >Выбрать</button>
      </div>
    </div>
  </div>
  <GiftModal v-if="showGiftModal" @close-modal="changeStatusGiftModal" />
</template>

<script setup lang="ts">
import GiftModal from "~/components/modals/Cart/GiftModal.vue";
import {ref} from 'vue'
import {useCartStore} from "~/store/cart";
const store = useCartStore()
const props = defineProps({
  coupons: {
    type: Array,
    default: () => ([]),
  }
})
let showGiftModal = ref(false)

function changeStatusGiftModal(payload: boolean) {
  showGiftModal.value = payload
}

function removeGiftItem() {
  store.removeActiveCoupon()
  changeStatusGiftModal(true)
}
function clearCouponList() {
  store.clearCouponList()
}
const item = computed(() => {
  if (store.activeCoupon) {
    const result =  store.couponsList.filter(item => item.code === store.activeCoupon?.code)
    return result[0]
  }
})
</script>

<style lang="scss" scoped>
.modal-cart-gift {
  position: relative;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  padding: 5px 10px;
  background: $white;
  border-radius: 20px;

  &__remove {
    position: absolute;
    top: 15px;
    right: 10px;

    ::v-deep(.ui-icon) svg {
      width: 18px;
      height: 18px;

      path {
        fill: $grayText;
      }
    }
  }

  &__main {
    display: flex;
    align-items: center;
    grid-gap: 20px;
  }

  &__image {
    flex: 0 0 auto;

    width: 110px;
    height: 110px;

    border: 1px solid $grayBg;
    border-radius: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 10px 0;
  }

  &__top {
    display: grid;
    grid-gap: 4px;

    padding-right: 30px;
  }

  &__title {
    @include text_normal;
    font-weight: 600;
  }

  &__subtitle {
    @include text_mini;
    color: $grayText;
  }

  &__button {
    background-color: $yellow;
    @include text_small;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 14px;
    margin-top: 10px;
    &-change {
      border: 2px solid $yellow;
      @include text_small;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 14px;
      margin-top: 10px;
    }
  }
}
</style>