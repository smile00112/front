<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="emits('close')"
  >
    <form
      class="modal-bonuses"
      @submit.prevent="submit()"
    >
      <div class="modal-bonuses__header">
        <p class="modal-bonuses__title">
          Укажите количество бонусов для списания
        </p>

        <button
          href="#"
          rel="nofollow"
          class="modal-bonuses__close"
          @click.prevent="closeModal()"
        >
          <UIIcon name="close" />
        </button>
      </div>

      <div class="modal-bonuses__lines">
        <div class="modal-bonuses__line">
          <p class="modal-bonuses__label">
            Ваш бонусный баланс:
          </p>
          <p class="modal-bonuses__value">
            2 840
            <UIIcon name="bonuses" />
          </p>
        </div>
        <div class="modal-bonuses__line">
          <p class="modal-bonuses__label">
            Доступно для списания:
          </p>
          <p class="modal-bonuses__value">
            1 270
            <UIIcon name="bonuses" />
          </p>
        </div>
      </div>

      <div class="modal-bonuses__input">
        <input
          type="text"
          placeholder="1 270 баллов"
          class="modal-bonuses__input-area"
        >
        <p class="modal-bonuses__note">
          1 бонус = 1 рубль
        </p>
      </div>

      <UIButton
        type="submit"
        color="yellow"
        class="modal-bonuses__button"
      >
        Продолжить
      </UIButton>
    </form>
  </ModalsOverlay>
</template>

<script setup lang="ts">

const isShow = ref(true)

const emits = defineEmits(['close', 'submit'])

const closeModal = () => {
  isShow.value = false
}

const submit = () => {}
</script>

<style lang="scss" scoped>
.modal-bonuses {
  width: 100vw;
  min-height: 100vh;

  display: grid;
  grid-gap: 40px;

  padding: 20px;

  background: $white;

  @include mq($bp-small) {
    min-height: auto;
    max-width: 450px;

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
    align-items: flex-start;
    justify-content: space-between;
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__lines {
    display: grid;
    grid-gap: 6px;
  }

  &__line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    @include text_normal;
    font-weight: 500;
    color: $black;
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_large;
    font-weight: 700;

    ::v-deep(.ui-icon) svg path {
      fill: $yellow;
    }
  }

  &__input {
    display: grid;
    grid-gap: 10px;
  }

  &__input-area {
    width: 100%;
    height: 48px;

    padding: 12px 16px;

    @include text_normal;
    font-weight: 500;

    background: $grayBg;
    border-radius: 14px;

    &::-webkit-input-placeholder {
      color: $grayText;
    }
    &:-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &::-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &:-ms-input-placeholder {
      color: $grayText;
    }
    &::-ms-input-placeholder {
      color: $grayText;
    }
    &::placeholder {
      color: $grayText;
    }
  }

  &__note {
    text-align: center;
    @include text_mini;
    color: $grayText;
  }

  &__button {
    font-weight: 500;
  }
}
</style>
