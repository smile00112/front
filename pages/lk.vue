<template>
  <main class="page-lk">
    <div class="container">
      <section class="page-lk__section">
        <UIButton
          to="/"
          color="yellow"
          class="page-lk__back"
        >
          <UIIcon name="arrow" />
          В меню
        </UIButton>

        <h1 class="page-lk__title">
          Личный кабинет
        </h1>

        <div class="page-lk__content">
          <PagesLkNavigation
            class="page-lk__navigation"
          />

          <div class="page-lk__page">
            <NuxtPage :page-key="route => route.fullPath" class="page-lk__page" />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page-lk {
  padding: 10px 0 40px;

  @include mq($bp-medium) {
    padding: 40px 0;
  }

  &__section {
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
  }

  &__back {
    display: none;

    @include mq($bp-medium) {
      display: flex;
      justify-content: flex-start;
      
      width: 168px;

      font-weight: 500;

      .ui-icon {
        transform: rotate(180deg);
      }
    }
  }

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include h2;
    }
  }

  &__content {
    display: flex;
    align-items: flex-start;
    grid-gap: 55px;
  }

  &__navigation {
    display: none;

    @include mq($bp-medium) {
      display: block;
      flex: 0 0 395px;
    }
  }

  &__page {
    flex: 1 1 auto;

    @include mq($bp-medium) {
      padding-top: 40px;
    }
  }
}
</style>
