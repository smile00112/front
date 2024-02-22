<template>
  <div class="page-order-info-about">
    <p class="page-order-info-about__title">
      Информация о заказе
    </p>

    <div class="page-order-info-about__rows">
      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Статус
        </p>

        <div class="page-order-info-about__value">
          <div class="page-order-info-about-status">
            <UIIcon name="clock" />
            {{ currentStatus }}
          </div>
        </div>
      </div>

      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Дата / время
        </p>

        <div class="page-order-info-about__value">
          <!-- 30.09.23, 21:30-21:50 --> --
        </div>
      </div>

      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Способ получения
        </p>

        <div class="page-order-info-about__value">
          <!-- Самовывоз --> --
        </div>
      </div>

      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Адрес
        </p>

        <div class="page-order-info-about__value">
          {{ info.address_1 || '--' }}
        </div>
      </div>

      <div class="page-order-info-about__row">
        <p class="page-order-info-about__label">
          Комментарий
        </p>

        <div class="page-order-info-about__value page-order-info-about__value--comment">
          <!-- Комментарий, который оставил пользователь при заказе. Комментарий, который оставил пользователь при заказе -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    default: '',
  },

  info: {
    type: Object,
    default: () => ({}),
  },
})

const currentStatus = computed(() => {
  if (props.status === 'pending') {
    return 'В ожидании'
  }
})
</script>

<style lang="scss" scoped>
.page-order-info-about {
  display: flex;
  flex-direction: column;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
    color: $black;
  }

  &__rows {
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  &__label {
    flex: 0 0 175px;

    @include text_small;
    font-weight: 500;
    color: $grayText;
  }

  &__value {
    @include overflow-text;
    @include text_small;
    font-weight: 600;

    &--comment {
      @include text_mini;
      font-weight: 400;
      white-space: normal;
    }
  }
}

.page-order-info-about-status {
  display: flex;
  align-items: center;
  grid-gap: 6px;

  padding: 4px 12px;

  @include extra_small;
  font-weight: 600;
  color: #F2A32C;

  background: #FFF9DF;
  border-radius: 16px;

  ::v-deep(.ui-icon) svg {
    width: 12px;
    height: 12px;

    path {
      fill: #F2A32C;
    }
  }
}
</style>