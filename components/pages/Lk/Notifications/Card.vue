<template>
  <div class="lk-notifications-card">
    <div class="lk-notifications-card__header">
      <p class="lk-notifications-card__title">
        Заголовок
      </p>

      <p class="lk-notifications-card__date">
        24 сентября 2023
      </p>
    </div>

    <p class="lk-notifications-card__text">
      Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации систем массового участия. Идейные соображения высшего порядка, а также сложившаяся структура .
    </p>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.lk-notifications-card {
  display: grid;
  grid-gap: 16px;

  padding: 20px 40px;

  background: $grayBg2;
  border-radius: 30px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include text_big;
    font-weight: 600;
    color: $black;
  }

  &__date {
    @include text_mini;
    font-weight: 600;
    color: $grayText;
  }

  &__text {
    @include text_small;
    line-height: 16.8px;
    color: $black;
  }
}
</style>