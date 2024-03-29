<template>
  <div class="modal-cart-item">
    <button
      class="modal-cart-item__remove"
      @click.prevent="removeFromCart()"
    >
      <UIIcon name="trash" />
    </button>
    <div class="modal-cart-item__main">
      <div class="modal-cart-item__image">
        <img
          :data-src="productImage"
          :alt="item.name"
          v-lazy-load
        >
      </div>
      <div class="modal-cart-item__content">
        <div class="modal-cart-item__top">
          <p class="modal-cart-item__title">
            {{ item.name }}
          </p>
          <!-- <p class="modal-cart-item__info">
            <span>
              100 гр
            </span>
            <span>
              1680 ₽/шт
            </span>
          </p> -->
        </div>

        <div class="modal-cart-item__footer">
          <div class="modal-cart-item__price">
            <small v-if="+itemRegularPrice !== +itemPrice">
              {{ itemRegularPrice.toLocaleString() }} ₽
            </small>
            {{ itemPrice.toLocaleString() }} ₽
          </div>

          <UICounter
            :count="counterLabel"
            @increment="increment()"
            @decrement="decrement()"
            class="modal-cart-item__counter"
          />
        </div>
      </div>
    </div>

    <div
      v-if="item.supplements.length"
      class="modal-cart-item__supplements"
    >
      <div
        v-for="(supplement, s) in item.supplements"
        :key="s"
        class="modal-cart-item-supplement"
      >
        <p class="modal-cart-item-supplement__name">
          {{ supplement.name }}
        </p>

        <div class="modal-cart-item-supplement__info">
          <p class="modal-cart-item-supplement__count">
            {{ supplement.count }} шт
          </p>
          <p class="modal-cart-item-supplement__price">
            +{{ supplement.price }} ₽
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import imageSize from '@/utils/imageSize'

const cart = useCartStore()
const { productInCart } = storeToRefs(cart)

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  }
})

// Computed
const productImage = computed(() => {
  const image = props.item.image
  return imageSize(image, 'small')
})

const counterLabel = computed(() => {
  const value = parseInt(((props.item.portion_nat_size * props.item.count) * 100).toString()) / 100
  return `${value} ${props.item.measure_unit}`
})

const currentProductInCart = computed(() => {
  return productInCart.value(+props.item.id, props.item.supplements)
})

const supplementsPrice = computed(() => {
  return props.item.supplements.reduce((acc, item) => {
    acc += item.count * item.price

    return acc
  }, 0)
})

const itemRegularPrice = computed(() => {
  return (supplementsPrice.value + +props.item.regular_price) * props.item.count
})

const itemPrice = computed(() => {
  return (supplementsPrice.value + +props.item.price) * props.item.count
})

// Methods
const removeFromCart = () => {
  cart.removeFromCart(+currentProductInCart.value.idx)
}

const increment = () => {
  cart.incrementItem(+currentProductInCart.value.idx)
}

const decrement = () => {
  cart.decrementItem(+currentProductInCart.value.idx)
}
</script>

<style lang="scss" scoped>
.modal-cart-item {
  position: relative;

  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  padding: 5px 10px 5px 5px;

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
    grid-gap: 20px;
  }

  &__image {
    flex: 0 0 auto;

    width: 100px;
    height: 100px;

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
    @include text_small;
    font-weight: 600;
  }

  &__info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @include text_mini;
    color: $grayText;

    span {
      display: flex;
      align-items: center;

      &:after {
        content: '';
        display: block;
        width: 3px;
        height: 3px;

        margin: 0 4px;

        background: $grayText;
        border-radius: 50%;
        opacity: 0.3;
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 20px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    @include text_normal;
    font-weight: 600;
    color: $orange;

    small {
      @include extra_small;
      color: rgba(0, 0, 0, 0.30);
      text-decoration: line-through;
    }
  }

  &__counter {
    max-width: 130px;
  }

  &__supplements {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;

    padding: 0 10px 5px 8px;
  }
}

.modal-cart-item-supplement {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__name {
    @include text_small;
  }

  &__info {
    display: flex;
    align-items: center;
  }

  &__count {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    padding: 3px 6px;

    @include text_mini;

    background: $grayBg;
    border-radius: 23px;
  }

  &__price {
    width: 60px;

    padding-left: 10px;

    @include text_small;
    font-weight: 600;
    color: #B0B0B0;
    text-align: right;
  }
}
</style>