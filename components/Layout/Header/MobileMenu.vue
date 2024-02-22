<template>
  <div class="mobile-menu">
    <div class="mobile-menu__content">
      <div class="mobile-menu__header">
        <a
          href="/"
          class="mobile-menu-logo"
          @click.prevent="goTo('/')"
        >
          <UIIcon name="logo" />
        </a>

        <a
          href="#"
          class="mobile-menu__close"
          @click.prevent="close()"
        >
          <UIIcon name="close" />
        </a>
      </div>

      <div
        v-if="!userStore.isAuth"
        class="mobile-menu-auth"
      >
        <p class="mobile-menu-auth__title">
          Войдите в личный кабинет
        </p>
        <p class="mobile-menu-auth__description">
          Чтобы пользоваться бонусной системой и получать персональные предложения  
        </p>
        <UIButton
          color="yellow"
          class="mobile-menu-auth__button"
          @click.prevent="auth()"
        >
          <UIIcon name="person" />
          Войти
        </UIButton>
      </div>
      <PagesLkUserBlock
        v-else
        is-mobile-menu
      />

      <PagesLkNavigation
        v-if="userStore.isAuth"
        is-mobile-menu
        @click="close()"
      />
    </div>

    <div class="mobile-menu__footer">
      <a
        href="tel:+7 919 123 23 40"
        target="_blank"
        class="mobile-menu__phone"
      >
        +7 919 123 23 40
      </a>
      <p class="mobile-menu__time">
        <UIIcon name="clock" />
        c 9:00 до 20:00
      </p>
      <p class="mobile-menu__label">
        Мы в социальных сетях
      </p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const emits = defineEmits(['close', 'auth'])

// Methods
const close = () => {
  document.body.classList.remove('overflow-hidden')

  emits('close')
}

const auth = () => {
  emits('auth')

  close()
}

const goTo = (link) => {
  navigateTo(link)
  close()
}

onMounted(() => {
  document.body.classList.add('overflow-hidden')
})
</script>

<style lang="scss" scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  padding: 0 20px;

  background: $grayBg2;
  overflow-y: auto;
  z-index: 2000;

  &__content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 20px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 20px 0;

    border-bottom: 1px solid $grayText2;
  }

  &__close {
    ::v-deep(.ui-icon) svg {
      width: 30px;
      height: 30px;

      path {
        fill: #262626;
      }
    }
  }

  &__footer {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;

    padding: 20px 0 40px;
  }

  &__phone {
    @include text_large;
    font-weight: 700;

    margin-bottom: 10px;
  }

  &__time {
    display: flex;
    align-items: center;
    grid-gap: 10px;

    margin-bottom: 20px;

    @include text_normal;
    font-weight: 600;
    color: $grayText;
  }

  &__label {
    @include text_big;
    font-weight: 600;
    color: $grayText2;

    margin-bottom: 20px;
  }
}

.mobile-menu-logo {
  width: 134px;
  height: 30px;
}

.mobile-menu-auth {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 20px 30px;

  background: $white;
  border-radius: 20px;

  &__title {
    margin-bottom: 6px;

    @include text_big;
    font-weight: 600;
  }

  &__description {
    margin-bottom: 16px;

    @include text_small;
    font-weight: 500;
  }

  &__button {
    font-weight: 500;
  }
}
</style>