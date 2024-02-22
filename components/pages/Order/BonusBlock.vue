<template>
  <div class="page-order-bonus">
    <p class="page-order-bonus__title">
      Списать бонусы
    </p>

    <div class="page-order-bonus__box">
      <div class="page-order-bonus__col">
        <p class="page-order-bonus__label">
          Ваш бонусный баланс:
        </p>
        <p class="page-order-bonus__value">
          0
          <UIIcon name="bonuses" />
        </p>
      </div>

      <button
        type="submit"
        class="page-order-bonus__button"
        @click.prevent="emits('submit')"
      >
        Списать бонусы
      </button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['submit'])
</script>

<style lang="scss" scoped>
.page-order-bonus {
  display: grid;
  grid-gap: 24px;

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__col {
    display: grid;
    grid-gap: 4px;
  }

  &__label {
    @include text_mini;
    color: $grayText;
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

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 166px;
    height: 48px;

    @include text_normal;
    font-weight: 500;

    border: 2px solid $yellow;
    border-radius: 14px;
  }
}
</style>