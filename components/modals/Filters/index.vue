<template>
  <ModalsOverlay
    :is-show="isShow"
    @close="emits('close')"
  >
    <div class="modal-filters">
      <div class="modal-filters__main">
        <div class="modal-filters__header">
          <p class="modal-filters__title">
            Фильтры
          </p>

          <a
            href="#"
            class="modal-filters__close"
            @click.prevent="closeModal()"
          >
            <UIIcon name="close" />
          </a>
        </div>

        <div class="modal-filters__list">
          <ModalsFiltersBlock
            title="Цена"
            class="modal-filters__item"
          >
            <UICheckbox>
              Вариант 1
            </UICheckbox>
            <UICheckbox>
              Вариант 2
            </UICheckbox>
            <UICheckbox>
              Вариант 3
            </UICheckbox>
          </ModalsFiltersBlock>

          <ModalsFiltersBlock
            title="Название фильтра"
            class="modal-filters__item"
          >
            <UICheckbox>
              Вариант 1
            </UICheckbox>
            <UICheckbox>
              Вариант 2
            </UICheckbox>
            <UICheckbox>
              Вариант 3
            </UICheckbox>
          </ModalsFiltersBlock>

          <ModalsFiltersBlock
            title="Цена"
            class="modal-filters__item"
          >
            <UICheckbox>
              Вариант 1
            </UICheckbox>
            <UICheckbox>
              Вариант 2
            </UICheckbox>
            <UICheckbox>
              Вариант 3
            </UICheckbox>
          </ModalsFiltersBlock>

          <ModalsFiltersBlock
            title="Бесплатная доставка"
            switcher
            class="modal-filters__item"
          />
        </div>
      </div>

      <div class="modal-filters__footer">
        <div class="modal-filters__buttons">
          <UIButton
            color="gray"
            class="modal-filters__button"
            @click="closeModal()"
          >
            Отмена
          </UIButton>

          <UIButton
            color="yellow"
            class="modal-filters__button"
            @click="closeModal()"
          >
            Применить фильтры
          </UIButton>
        </div>
      </div>
    </div>
  </ModalsOverlay>
</template>

<script setup>
const emits = defineEmits(['close'])

const isShow = ref(true)

const closeModal = () => {
  isShow.value = false
}

const toggleFilter = (e) => {
  console.log('e', e)
}
</script>

<style lang="scss" scoped>
.modal-filters {
  width: 100vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: $white;

  @include mq($bp-small) {
    max-width: 640px;
    min-height: auto;

    border-radius: 40px;
  }

  &__main {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;

    padding: 20px 20px 145px;

    @include mq($bp-small) {
      padding: 50px 60px 145px;
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

  &__close {
    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $grayText;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;

    grid-gap: 15px;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    padding: 40px 20px 20px;

    border-top: 1px solid $grayBg2;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

    @include mq($bp-small) {
      padding: 40px 60px 50px;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 16px;
  }

  &__button {
    font-weight: 500;
  }
}
</style>