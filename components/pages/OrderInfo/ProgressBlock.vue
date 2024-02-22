<template>
  <div class="page-order-info-progress">
    <div class="page-order-info-progress__header">
      <p class="page-order-info-progress__date">
        Будет готов к выдаче
      </p>

      <button class="page-order-info-progress__cancel">
        <UIIcon name="close" />
        Отменить
      </button>
    </div>

    <div class="page-order-info-progress__cols">
      <div class="page-order-info-progress__col">
        <div class="page-order-info-progress__bar">
          <div
            class="page-order-info-progress__bar-line"
          />
        </div>
        <div class="page-order-info-progress__status">
          <UIIcon name="pencil" />
          Заказ принят
        </div>
      </div>

      <div class="page-order-info-progress__col">
        <div class="page-order-info-progress__bar">
          <div
            class="page-order-info-progress__bar-line"
          />
        </div>
        <div class="page-order-info-progress__status">
          <UIIcon name="cooking" />
          Готовится
        </div>
      </div>

      <div class="page-order-info-progress__col">
        <div class="page-order-info-progress__bar">
          <div
            class="page-order-info-progress__bar-line"
          />
        </div>
        <div class="page-order-info-progress__status">
          <UIIcon name="lounge" />
          Готов к выдаче
        </div>
      </div>

      <div class="page-order-info-progress__col">
        <div class="page-order-info-progress__bar">
          <div
            class="page-order-info-progress__bar-line"
          />
        </div>
        <div class="page-order-info-progress__status">
          <UIIcon name="pickup" />
          Вручен
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.page-order-info-progress {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__date {
    @include text_normal;
    font-weight: 600;
    color: $grayText;
  }

  &__cancel {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    padding: 0;

    @include text_normal;
    font-weight: 500;
    color: $grayText;

    background: none;
    border: 0;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $grayText;
      }
    }
  }

  &__cols {
    display: flex;
    align-items: flex-start;
    grid-gap: 8px;
  }

  &__col {
    flex: 1;

    display: flex;
    flex-direction: column;
    grid-gap: 8px;

    &.done {
      .page-order-info-progress {
        &__bar-line {
          width: 100%;
        }
      }
    }

    &.active {
      flex: 2;

      .page-order-info-progress {
        &__status {
          color: $blackText;

          ::v-deep(.ui-icon) svg path {
            fill: #1C1B1F;
          }
        }
      }
    }
  }

  &__bar {
    position: relative;
    width: 100%;
    height: 4px;

    background: $greenLight;
    border-radius: 8px;
    overflow: hidden;
  }

  &__bar-line {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    background: $green;
  }

  &__status {
    display: flex;
    align-items: center;
    grid-gap: 8px;

    @include text_small;
    font-weight: 600;
    color: $grayText;

    ::v-deep(.ui-icon) svg {
      width: 20px;
      height: 20px;

      path {
        fill: $grayText;
      }
    }
  }
}
</style>