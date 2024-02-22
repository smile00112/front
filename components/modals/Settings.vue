<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="commonStore.toggleShowSettingsModal(false)"
  >
    <div class="modal-settings">
      <div class="modal-settings__header">
        <p class="modal-settings__title">
          Настройки
        </p>

        <a
          href="#"
          rel="nofollow"
          class="modal-settings__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </a>
      </div>

      <p class="modal-settings__description">
        Укажите страну проживания, используемые язык и валюту
      </p>

      <div class="modal-settings__form">
        <UISelect
          label="Регион"
          placeholder="Российская Федерация"
        />
        <UISelect
          label="Язык"
          placeholder="Русский"
        />
        <UISelect
          label="Валюта"
          placeholder="Рубль"
        />
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
.modal-settings {
  width: 100vw;
  max-width: 450px;

  display: flex;
  flex-direction: column;

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

    margin-bottom: 20px;
  }

  &__title {
    @include h2;
  }

  &__description {
    margin-bottom: 40px;

    @include text_big;
  }

  &__form {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
  }
}
</style>
