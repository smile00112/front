<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="commonStore.toggleShowAcceptCityModal(false)"
  >
    <div class="modal-accept-city">
      <div class="modal-accept-city__header">
        <p class="modal-accept-city__title">
          Ваш город?
        </p>

        <a
          href="#"
          rel="nofollow"
          class="modal-accept-city__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </a>
      </div>

      <div class="modal-accept-city__main">
        <UIIcon name="navigate" />
        Санкт-Петербург
      </div>

      <div class="modal-accept-city__buttons">
        <UIButton
          color="yellow"
          class="modal-accept-city__button"
          @click="closeModal()"
        >
          Подтвердить
        </UIButton>
        <UIButton
          color="yellow-outline"
          class="modal-accept-city__button"
          @click="closeModal()"
        >
          Нет, другой
        </UIButton>
      </div>
    </div>
  </ModalsOverlay>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

const isShow = ref(true)

const closeModal = () => {
  isShow.value = false
}
</script>

<style lang="scss" scoped>
.modal-accept-city {
  width: 100vw;
  max-width: 450px;

  display: flex;
  flex-direction: column;
  grid-gap: 50px;

  padding: 50px 60px;

  background: $white;
  border-radius: 40px;

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

  &__main {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 16px;

    @include text_big;
    font-weight: 600;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
  }

  &__button {
    font-weight: 500;
  }
}
</style>
