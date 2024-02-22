<template>
  <div
    :class="[
      'price-block',
      {
        'price-block--reverse': isReverse,
        'price-block--big': isBig,
      },
    ]"
  >
    <small v-if="regularPrice && +regularPrice !== +price">
      {{ regularPrice.toLocaleString() }} ₽
    </small>
    {{ price.toLocaleString() }} ₽
  </div>
</template>

<script setup>
defineProps({
  regularPrice: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    default: 0,
  },

  isReverse: {
    type: Boolean,
    default: false,
  },

  isBig: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.price-block {
  display: flex;
  align-items: center;
  grid-gap: 6px;

  color: $orange;

  @include text_normal;
  font-weight: 600;

  small {
    @include extra_small;
    color: $grayText;
    text-decoration: line-through;
  }

  &--reverse{
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  &--big {
    grid-gap: 20px;

    @include h2;

    small {
      @include text_normal;
      font-weight: 500;
    }
  }
}
</style>