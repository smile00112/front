<template>
  <a
    :href="`?product_id=${item.id}`"
    :class="['index-menu-card', { 'index-menu-card--promo' : isPromo }]"
    @click.prevent="openProduct()"
  >
    <div class="index-menu-card__image">
      <img
        :data-src="productImage"
        :alt="item.name"
        v-lazy-load
      >

      <span
        v-if="discount"
        class="index-menu-card__discount"
      >
        -{{ discount }}%
      </span>
      
      <button
        :class="['index-menu-card__favorite', { 'active' : isProductFavorite(+item.id) }]"
        @click.stop.prevent="toggleFavorite()"
      >
        <UIIcon name="heart" />
      </button>

      <div class="index-menu-card__types">
        <div v-if="badges.includes('halal')" class="index-menu-card-type">
          <UIIcon name="icon-halal" />
        </div>
        <div v-if="badges.includes('preorder')" class="index-menu-card-type">
          <UIIcon name="icon-hit" />
        </div>
        <div v-if="badges.includes('vegan')" class="index-menu-card-type">
          <UIIcon name="icon-vegan" />
        </div>
        <div v-if="badges.includes('spicy')" class="index-menu-card-type">
          <UIIcon name="icon-hot" />
        </div>
      </div>
    </div>

    <div class="index-menu-card__content">
      <p class="index-menu-card__name">
        {{ item.name }}
      </p>

      <div class="index-menu-card__description">
        <p class="index-menu-card__info index-menu-card__info--gray">
          <span>
            В наличии
          </span>
          <span>
            {{ inStock }} {{ productMeasureUnit }}
          </span>
        </p>
      </div>

      <div class="index-menu-card__description">
        <p
          v-if="isCountable"
          class="index-menu-card__info"
        >
          <span>
            {{ productBasePortionSize }} {{ productSubMeasureUnit }}
          </span>
        </p>
        <p
          v-else
          class="index-menu-card__info"
        >
          <span>
            {{ productBasePortionSize }} {{ productSubMeasureUnit }}
          </span>
        </p>

        <CommonPriceBlock
          :regular-price="+item.regular_price"
          :price="+item.price"
          class="index-menu-card__price"
        />
      </div>

      <CommonAddButton
        :item="currentProductInCart.item"
        :product-type="productType"
        @increment="increment()"
        @decrement="decrement()"
        @add="addToCart()"
        @click="openProduct()"
        class="index-menu-card__button"
      />
    </div>
  </a>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import imageSize from '@/utils/imageSize'

const catalog = useCatalogStore()
const cart = useCartStore()
const userStore = useUserStore()
const router = useRouter()

const { productInCart } = storeToRefs(cart)
const { isProductFavorite } = storeToRefs(catalog)

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  isPromo: {
    type: Boolean,
    default: false,
  },
})

// <!-- Computed -->
const productImage = computed(() => {
  const image = props.item?.images[0] || ''
  return imageSize(image, 'medium')
})

const discount = computed(() => {
  if (props.item?.regular_price && props.item?.price && +props.item.regular_price !== +props.item.price) {
    return parseInt((100 - (props.item.price / props.item.regular_price * 100)) * 100) / 100
  }

  return 0
})

// Тип продукта
const productType = computed(() => {
  return props.item?.type
})

const currentProductInCart = computed(() => {
  if (productType.value === 'simple') {
    return productInCart.value(+props.item.id)
  }

  return {
    idx: null,
    item: null,
  }
})

const isCountable = computed(() => {
  return props.item?.countable || false
})

// Кол-во
const productQuantity = computed(() => {
  return props.item?.stock_quantity || 0
})

const productBasePortionSize = computed(() => {
  return props.item?.base_portion_size || 1
})

// В наличии
const inStock = computed(() => {
  return productQuantity.value / productBasePortionSize.value
})

const productMeasureUnit = computed(() => {
  return props.item?.measure_unit || ''
})

const productSubMeasureUnit = computed(() => {
  return props.item?.sub_measure_unit || ''
})

const badges = computed(() => {
  return props.item?.acf['product-badge'] || []
})

// <!-- Methods -->
const toggleFavorite = () => {
  const productId = +props.item.id

  if (isProductFavorite.value(productId)) {
    catalog.removeFromFavorite(productId)
  } else {
    catalog.addToFavorite(productId)
  }
}

const openProduct = () => {
  const productId = +props.item.id

  catalog.setProduct(productId)

  router.push({
    query: {
      product_id: productId
    }
  })
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
.index-menu-card {
  display: flex;
  flex-direction: column;

  background: $white;
  border-radius: 20px;

  &--promo {
    background: $yellowLightSecondary;

    .index-menu-card {
      &__image {
        border-color: $yellow;
      }

      &__discount {
        background: $orange;
      }

      &__button {
        background: $white;
      }
    }
  }

  &__image {
    position: relative;
    width: 100%;
    height: 212px;

    border-radius: 20px;
    border: 1px solid $grayBg;
    overflow: hidden;

    cursor: pointer;

    @include mq($bp-small) {
      height: 316px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__discount {
    position: absolute;
    top: 16px;
    left: 16px;

    padding: 4px 12px;

    @include text_mini;
    font-weight: 600;

    background: $grayBg;
    border-radius: 16px;
  }

  &__favorite {
    position: absolute;
    top: 0;
    right: 0;

    padding: 16px;

    &.active {
      ::v-deep(.ui-icon) svg path {
        fill: $orange;
      }
    }
  }

  &__types {
    position: absolute;
    left: 16px;
    bottom: 16px;

    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }

  &__content {
    display: grid;
    padding: 16px 10px 10px;
  }

  &__name {
    margin-bottom: 16px;

    @include overflow-text;
    @include text_big;
    font-weight: 600;

    cursor: pointer;
  }

  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 8px;
  }

  &__info {
    // display: none;

    // @include mq($bp-small) {
      display: flex;
      align-items: center;

      @include text_mini;

      span {
        display: flex;
        align-items: center;

        &:after {
          content: url('@/assets/svg/dot-middle.svg');
          display: flex;
          align-items: center;
          margin: 0 10px;
        }

        &:last-child {
          &:after {
            display: none;
          }
        }
      }
    // }

    &--gray {
      color: $grayText;
    }
  }

  &__counter {
    height: 48px;
  }
}

.index-menu-card-type {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  margin-left: -7px;

  background: $white;
  border-radius: 50%;
  box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.05);

  &:last-child {
    margin-left: 0;
  }

  .ui-icon {
    width: 20px;
    height: 20px;
  }
}
</style>