<template>
  <main class="brands">
    <div class="container">
      <div class="brands__box">
        <aside class="brands__aside aside">
          <UIButton
            to="/"
            color="gray"
            class="aside__back"
          >
            <UIIcon name="arrow" />
            Назад
          </UIButton>
        </aside>

        <section class="brands__section">
          <h1 class="brands__title">
            Все магазины
          </h1>

          <div class="brands__list">
            <PagesBrandsCard
              v-for="i in 12"
              :key="i"
            />
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.brands {
  padding: 15px 0 40px;

  @include mq($bp-small) {
    padding: 40px 0;
  }

  &__box {
    display: grid;

    @include mq($bp-small) {
      grid-template-columns: 291px minmax(500px, 978px);
      grid-gap: 60px;
    }
  }

  &__title {
    display: none;

    @include mq($bp-small) {
      display: block;

      @include h2;

      margin-bottom: 50px;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px 40px;

    @include mq($bp-small) {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 60px;
    }
  }
}

.aside {
  display: none;

  @include mq($bp-small) {
    display: block;
  }

  &__back {
    width: 100%;
    justify-content: flex-start;
    font-weight: 600;

    span {
      transform: rotate(180deg);
    }
  }
}
</style>
