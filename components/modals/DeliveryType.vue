<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="commonStore.toggleShowDeliveryTypeModal(false)"
  >
    <div class="modal-delivery-type">
      <div class="modal-delivery-type__header">
        <p class="modal-delivery-type__title">
          Способ получения
        </p>

        <a
          href="#"
          rel="nofollow"
          class="modal-delivery-type__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </a>
      </div>

      <div class="modal-delivery-type__body">
        <p class="modal-delivery-type__text">
          Как Вам удобнее получить заказ?
        </p>
        <div class="modal-delivery-type__types">
          <button
            v-for="(item, i) in deliveryTypes"
            :key="i"
            :class="['modal-delivery-type__type', { 'active' : item.type === deliveryType }]"
            @click="deliveryType = item.type"
          >
            <UIIcon :name="item.type" />
            {{ item.label }}
          </button>
        </div>
      </div>

      <div class="modal-delivery-type__footer">
        <UIButton
          :disabled="!deliveryType"
          type="submit"
          color="yellow"
          class="modal-delivery-type__button"
          @click="submit()"
        >
          Продолжить
        </UIButton>
      </div>
    </div>
  </ModalsOverlay>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

const deliveryTypes = [
  { label: 'Доставка', type: 'delivery' },
  { label: 'Самовывоз', type: 'pickup' },
  { label: 'В зале', type: 'lounge' },
]

const isShow = ref(true)
const deliveryType = ref('pickup')

const closeModal = () => {
  isShow.value = false
}

const submit = () => {
  commonStore.setDeliveryType(deliveryType.value)

  commonStore.toggleShowReceiptModal(true)
  closeModal()
}
</script>

<style lang="scss" scoped>
.modal-delivery-type {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  grid-gap: 50px;

  padding: 20px;

  background: $white;

  @include mq($bp-small) {
    max-width: 600px;
    min-height: auto;

    padding: 50px 60px;

    border-radius: 40px;
  }

  &__close {
    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $blackText;
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include h2;
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 24px;
  }

  &__text {
    @include text_big;
    color: $black;
  }

  &__types {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    padding: 5px;

    background: $grayBg2;
    border-radius: 20px;
  }

  &__type {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 10px;

    padding: 12px 15px;
    color: $grayText;
    font-weight: 600;

    background: none;
    border-radius: 14px;
    border: 0;

    transition: color 0.3s, background-color 0.3s;
    white-space: nowrap;

    &.active {
      color: $blackText;
      background: $yellow;
    }
  }

  &__button {
    width: 100%;
    font-weight: 500;
  }
}
</style>
