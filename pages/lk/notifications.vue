<template>
  <div class="page-lk-notifications">
    <h2 class="page-lk-notifications__title">
      История уведомлений
    </h2>

    <div class="page-lk-notifications__box">
      <div class="page-lk-notifications__block">
        <div class="page-lk-notifications__header">
          24 сентября 2023
        </div>
        <div class="page-lk-notifications__list">
          <PagesLkNotificationsCard
            v-for="i in 3"
            :key="i"
          />
        </div>
      </div>

      <div class="page-lk-notifications__block">
        <div class="page-lk-notifications__header">
          23 сентября 2023
        </div>
        <div class="page-lk-notifications__list">
          <PagesLkNotificationsCard
            v-for="i in 3"
            :key="i"
          />
        </div>
      </div>

      <div class="page-lk-notifications__block">
        <div class="page-lk-notifications__header">
          22 сентября 2023
        </div>
        <div class="page-lk-notifications__list">
          <PagesLkNotificationsCard
            v-for="i in 3"
            :key="i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk-notifications {
  display: grid;
  grid-gap: 40px;

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include text_large;
      font-weight: 700;
      color: $black;
    }
  }

  &__box {
    display: grid;
    grid-gap: 12px;

    @include mq($bp-medium) {
      grid-gap: 16px;
    }
  }

  &__block {
    display: grid;
    grid-gap: 10px;
  }

  &__header {
    padding: 10px 0;

    @include text_normal;
    font-weight: 600;
    color: $grayText;
    text-align: center;

    @include mq($bp-medium) {
      @include text_big;
      font-weight: 600;
    }
  }

  &__list {
    display: grid;
    grid-gap: 16px;
  }
}
</style>
