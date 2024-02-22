<template>
  <div class="page-order-buttons">
    <UIButton
      color="gray"
      class="page-order-buttons__button page-order-buttons__button--back"
      @click="navigateTo('/')"
    >
      <UIIcon
        name="arrow"
        class="page-order-buttons__arrow"
      />
      Назад в корзину
    </UIButton>

    <UIButton
      :is-loading="isLoading"
      color="yellow"
      :class="['page-order-buttons__button page-order-buttons__button--order', { 'page-order-buttons__button--center' : isLoading }]"
      @click="emits('submit')"
    >
      <span>
      Оформить заказ
      </span>
      {{ endPrice.toLocaleString() }} ₽
    </UIButton>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()
const { cartItemsPrice } = storeToRefs(cartStore)

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['submit'])

// <!-- Computed -->
const promocode = computed(() => cartStore.promocode)

const endPrice = computed(() => {
  const promocodeObj = promocode.value
  let sum = cartItemsPrice.value

  if (promocodeObj) {
    const promocodeAmount = promocodeObj.amount
    if (promocodeObj.type === 'percent') {
      sum = parseInt((sum - (sum / 100 * promocodeAmount)) * 100) / 100
    } else {
      sum = parseInt(sum - promocodeAmount * 100) / 100
    }
  }

  return sum
})
</script>

<style lang="scss" scoped>
.page-order-buttons {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__button {
    width: 100%;
    font-weight: 600;

    @include mq($bp-medium) {
      width: auto;
    }

    &--back {
      display: none;

      @include mq($bp-medium) {
        display: flex;
      }
    }
    
    &--order {
      grid-gap: 40px;
      justify-content: space-between;
      min-width: 200px;

      span {
        font-weight: 500;
      }
    }

    &--center {
      justify-content: center;
    }
  }

  &__arrow {
    transform: rotate(180deg);
  }
}
</style>