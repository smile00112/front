<template>
  <div class="header-search-item">
    <div class="header-search-item__image">
      <img
        :data-src="productImage"
        :alt="item.name"
        v-lazy-load
      >
    </div>

    <div class="header-search-item__content">
      <div class="header-search-item__info">
        <p class="header-search-item__title">
          {{ item.name }}
        </p>

        <CommonPriceBlock
          :regular-price="+item.regular_price"
          :price="+item.price"
          is-reverse
          class="header-search-item__price"
        />
      </div>

      <CommonAddButton
        :count="productCount"
        :product-type="productType"
        @increment="increment()"
        @decrement="decrement()"
        @add="addToCart()"
        @click="openProduct()"
        is-small
        class="header-search-item__button"
      />
    </div>
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'
import { useCartStore } from '@/store/cart'

const catalog = useCatalogStore()
const cart = useCartStore()

const { productInCart } = storeToRefs(cart)

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const productImage = computed(() => {
  return props.item?.images[0] || ''
})

const productType = computed(() => {
  return props.item?.type
})

const currentProductInCart = computed(() => {
  if (productType.value === 'simple') {
    return productInCart.value(+props.item.id)
  }

  return {
    idx: null
  }
})

const productCount = computed(() => {
  return currentProductInCart.value?.item?.count || 0
})

const openProduct = () => {
  catalog.setProduct(+props.item.id)
}

const addToCart = () => {
  cart.addToCart(props.item)
}

const increment = () => {
  cart.incrementItem(currentProductInCart.value.idx)
}

const decrement = () => {
  cart.decrementItem(currentProductInCart.value.idx)
}
</script>

<style lang="scss" scoped>
.header-search-item {
  display: flex;
  align-items: center;
  grid-gap: 20px;

  &__image {
    flex: 0 0 auto;
    width: 100px;
    height: 80px;

    background: $grayBg;
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
    align-items: center;
    justify-content: space-between;
    grid-gap: 20px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    grid-gap: 9px;
  }

  &__title {
    @include overflow-multi-text(2);
    @include text_normal;
    font-weight: 600;
  }

  &__button {
    width: 150px;
  }
}
</style>