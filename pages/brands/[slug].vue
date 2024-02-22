<template>
  <main class="brand">
    <div class="container">
      <div class="brand__box">
        <aside class="brand__aside aside">
          <UIButton
            to="/brands"
            color="yellow"
            class="aside__back"
          >
            <UIIcon name="arrow" />
            Все рестораны
          </UIButton>

          <div class="menu">
            <div class="menu__header">
              <p class="menu__title">
                Меню
              </p>

              <button
                class="menu__filter"
                @click.prevent="isShowFilters = true"
              >
                <UIIcon name="filter" />
                <span class="menu__filter-line" />
                3
              </button>
            </div>

            <ul class="menu__list">
              <li
                v-for="(item, i) in menu"
                :key="i"
                class="menu__item"
              >
                <a
                  href="#"
                  :class="['menu__link', { 'active' : i === 1 }]"
                  @click.prevent=""
                >
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <section class="brand__section">
          <div class="brand__banner">
            <div class="brand__content">
              <h1 class="brand__title">
                Название бренда
              </h1>
              <p class="brand__description">
                Описание бренда Описание бренда Описание бренда Описание бренда Описание бренда Описание бренда 
              </p>
            </div>

            <div class="brand__rating">
              <UIIcon name="star" />
              4.8
            </div>
          </div>

          <h2 class="brand__subtitle">
            Акции
          </h2>

          <div class="brand__list">
            <CommonProductCard
              v-for="i in 9"
              :key="i"
            />
          </div>
        </section>
      </div>
    </div>

    <ModalsFilters
      v-if="isShowFilters"
      @close="isShowFilters = false"
    />
  </main>
</template>

<script setup>
const isShowFilters = ref(false)

const menu = [
  { name: 'Новинки' },
  { name: 'Акции' },
  { name: 'Пицца' },
  { name: 'Роллы' },
  { name: 'Обед/ужин' },
  { name: 'Десерты' },
  { name: 'Закуски' },
]
</script>

<style lang="scss" scoped>
.brand {
  padding: 15px 0 40px;

  @include mq($bp-small) {
    padding: 40px 0;
  }

  &__box {
    @include mq($bp-small) {
      display: grid;
      grid-template-columns: 291px minmax(500px, 978px);
      grid-gap: 60px;
    }
  }

  &__banner {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    width: 100%;
    height: 220px;

    margin-bottom: 40px;
    padding: 40px;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url('@/assets/images/brand-banner-bg.jpg')no-repeat 50% / cover, lightgray 50% / cover no-repeat;
    border-radius: 40px;
    overflow: hidden;

    @include mq($bp-small) {
      height: 300px;

      padding: 40px 50px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    color: $white;
  }

  &__title {
    display: none;

    @include mq($bp-small) {
      display: block;

      @include h2;
    }
  }

  &__description {
    max-width: 450px;

    @include text_normal;

    font-weight: 500;
  }

  &__rating {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    padding: 12px 15px;

    @include text_normal;
    font-weight: 600;

    background: rgba(255, 255, 255, 0.60);
    border-radius: 14px;
  }

  &__subtitle {
    margin-bottom: 20px;

    @include text_large;
    font-weight: 700;

    @include mq($bp-small) {
      margin-bottom: 30px;

      @include h2;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;

    @include mq($bp-small) {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 30px 14px;
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

    margin-bottom: 30px;

    font-weight: 600;

    span {
      transform: rotate(180deg);
    }
  }
}

.menu {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;

  &__header {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px 15px;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      left: 15px;

      height: 1px;

      background: $grayBg;
    }
  }

  &__title {
    @include text_large;

    font-weight: 700;
    color: $black;
  }

  &__filter {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    @include text_normal;
    font-weight: 500;
    color: $orange;

    &-line {
      width: 2px;
      height: 20px;

      background: $grayText2;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__link {
    display: block;

    padding: 15px;

    @include text_normal;
    font-weight: 500;

    border-radius: 14px;
    transform: background-color 0.3s;

    &.active, &:hover {
      background-color: $grayBg;
    }
  }
}
</style>