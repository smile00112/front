<template>
  <div class="modal-cart-item">
    <div class="modal-cart-item__main">
      <div class="modal-cart-item__image" :style="disabled ? 'opacity: 0.5' : false">
        <img
            :data-src="item.image"
            :alt="item.name"
            v-lazy-load
        >
      </div>
      <button
          class="modal-cart-item__info"
      >
        <UIIcon name="info" />
      </button>
      <div class="modal-cart-item__content">
        <div class="modal-cart-item__top">
          <p class="modal-cart-item__title">
            {{ item.description }}
          </p>
          <p class="modal-cart-item__code">{{ item.code }}</p>
        </div>
        <button class="modal-cart-item__button" :disabled="disabled" v-if="!isSelectGift" @click="setNewGift(true)">Выбрать</button>
        <button class="modal-cart-item__button-change" v-else @click="setNewGift(false)">Изменить выбор</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
let isSelectGift = ref(false)
const emit = defineEmits(['selectGift'])

function setNewGift(payload: boolean) {
  emit('selectGift', payload ? props.item : {})
  isSelectGift.value = !isSelectGift.value
}
</script>

<style lang="scss" scoped>
.modal-cart-item {
  position: relative;

  display: flex;
  flex-direction: column;
  grid-gap: 16px;

  padding: 15px 10px;
  border-bottom: 1px solid $grayBg;
  background: $white;

  &__main {
    display: flex;
    grid-gap: 20px;
  }
  &__info {
    position: absolute;
    right: 0;
    top: 5px;
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
    @include text_normal;
    font-weight: 600;
  }
  &__code {
    @include text_mini;
    font-weight: 400;
    color: $grayText;
  }
  &__button {
    background-color: $yellow;
    @include text_small;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 14px;
    margin-top: 10px;
    &:disabled {
      opacity: .5;
    }
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