<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__col">
          <a
            href="tel:+79191232340"
            target="_blank"
            class="footer__phone"
          >
            +7 919 123 23 40
          </a>
          <p class="footer__time">
            <UIIcon name="clock" />
            c 9:00 до 20:00
          </p>
        </div>

        <div class="footer__row">
          <div class="footer__col">
            <p class="footer__title">
              Меню
            </p>
            <ul class="footer__menu footer-menu footer-menu--double">
              <li
                v-for="(item, i) in catalogStore.filteredCatalog"
                :key="i"
                class="footer-menu__item"
              >
                <a
                  :href="`#${item.name.toLowerCase()}`"
                  class="footer-menu__link"
                  @click.prevent="scrollToEl(`block_${item.id}`, -80)"
                >
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>

          <div class="footer__col">
            <p class="footer__title">
              О компании
            </p>
            <ul class="footer__menu footer-menu">
              <li
                v-for="(item, i) in about"
                :key="i"
                class="footer-menu__item"
              >
                <NuxtLink
                  :to="item.link"
                  class="footer-menu__link"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer__col">
          <div class="footer__block">
            <p class="footer__title">
              В приложении ещё удобнее
            </p>
            <div class="footer__apps">
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-app"
              >
                <img src="@/assets/images/google.png" alt="Google App">
                <div class="footer-app__content">
                  <p class="footer-app__label">
                    Доступно в
                  </p>
                  <p class="footer-app__value">
                    Google Play
                  </p>
                </div>
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-app"
              >
                <img src="@/assets/images/apple.png" alt="Apple App">
                <div class="footer-app__content">
                  <p class="footer-app__label">
                    Загрузите в
                  </p>
                  <p class="footer-app__value">
                    App Store
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div class="footer__block">
            <p class="footer__title">
              Мы в социальных сетях
            </p>
            <div class="footer__socials">
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/ig.png" alt="">
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/vk.png" alt="">
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/fb.png" alt="">
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/tg.png" alt="">
              </a>
              <a
                href="/"
                target="_blank"
                rel="nofollow"
                class="footer-social"
              >
                <img src="@/assets/images/socials/wa.png" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">
          ЛюблюЕду © 2021. Все права защищены.
        </p>

        <button
          class="footer__to-top"
          @click.prevent="scrollToTop()"
        >
          <UIIcon name="arrow" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'

import scrollToEl from '@/utils/scrollToEl'

const catalogStore = useCatalogStore()

const about = [
  { link: '/', name: 'Оплата' },
  { link: '/', name: 'Политика конфиденциальности' },
  { link: '/', name: 'Условия доставки' },
  { link: '/', name: 'Возврат' },
  { link: '/', name: 'Реквизиты' },
]

const scrollToTop = () => {
  scrollToEl()
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 40px 0;

  background: $grayBg2;

  @include mq($bp-medium) {
    padding: 70px 0 40px;
  }

  &__box {
    display: flex;
    flex-direction: column;
  }

  &__top {
    display: flex;
    flex-direction: column;
    grid-gap: 30px;

    @include mq($bp-medium) {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      grid-gap: 0;
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    grid-gap: 30px;
    
    @include mq($bp-super-small) {
      flex-direction: row;
      justify-content: space-between;
    }

    @include mq($bp-medium) {
      grid-gap: 120px;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
  }

  &__phone {
    margin-bottom: 9px;

    @include text_large;
    font-weight: 700;

    @include mq($bp-medium) {
      @include h2;
    }
  }

  &__time {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    color: $grayText;
    @include text_normal;
    font-weight: 600;

    @include mq($bp-medium) {
      @include text_big;

      padding-left: 4px;
    }
  }

  &__block {
    display: flex;
    flex-direction: column;

    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    margin-bottom: 20px;

    color: $grayText2;

    @include text_big;
    font-weight: 600;

    @include mq($bp-medium) {
      @include text_large;
      font-weight: 700;
    }
  }

  &__apps {
    display: flex;
    flex-direction: column;
    grid-gap: 30px;
    
    @include mq($bp-super-small) {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__socials {
    display: flex;
    align-items: center;
    grid-gap: 40px;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 30px;
    padding-top: 16px;

    border-top: 1px solid #D9D9D9;

    @include mq($bp-medium) {
      margin-top: 50px;
      padding-top: 22px;
    }
  }

  &__copy {
    color: $grayText;

    @include text_small;

    @include mq($bp-medium) {
      @include text_big;
    }
  }

  &__to-top {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    background: $orange;
    border-radius: 50%;

    .ui-icon {
      transform: rotate(-90deg);
      ::v-deep svg path{
        fill: $white;
      }
    }
  }
}

.footer-menu {
  display: grid;
  grid-gap: 16px 30px;

  @include mq($bp-medium) {
    grid-gap: 15px 60px;
  }

  &--double {
    grid-template-columns: repeat(2, 1fr);
  }

  &__link {
    display: block;

    @include text_small;
    font-weight: 500;
  }
}

.footer-app {
  display: flex;
  align-items: center;
  grid-gap: 15px;

  height: 48px;

  padding: 0 20px;

  background: $white;
  border-radius: 14px;

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__label {
    @include text_mini;
  }

  &__value {
    @include text_normal;
    font-weight: 600;

    white-space: nowrap;
  }
}
</style>
