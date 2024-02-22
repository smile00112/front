<template>
  <nav
    :class="['lk-navigation', { 'lk-navigation--mobile-menu' : isMobileMenu }]"
  >
    <ul class="lk-navigation__list">
      <li
        v-for="(item, i) in menu"
        :key="i"
        class="lk-navigation__item"
      >
        <a
          :href="item.link"
          :class="['lk-navigation-link lk-navigation__link', { 'active' : route.fullPath === item.link }]"
          @click.prevent="goTo(item.link)"
        >
          <span class="lk-navigation-link__value">
            <UIIcon
              :name="item.icon"
              class="lk-navigation-link__icon"
            />
            {{ item.label }}
          </span>
          <UIIcon
            name="arrow"
            class="lk-navigation-link__arrow"
          />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  isMobileMenu: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['click'])
const route = useRoute()

const menu = [
  { label: 'Личная информация', link: '/lk', icon: 'person' },
  { label: 'Избранное', link: '/lk/favorite', icon: 'heart' },
  { label: 'Доступные купоны', link: '/lk/promocodes', icon: 'gift' },
  { label: 'Бонусная система', link: '/lk/bonuses', icon: 'bonuses' },
  { label: 'Реферальная система', link: '/lk/referals', icon: 'referals' },
  { label: 'Предпочтения', link: '/lk/preferences', icon: 'preferences' },
  { label: 'История заказов', link: '/lk/orders', icon: 'orders' },
  { label: 'Колесо фортуны', link: '/lk/game', icon: 'wheel' },
  { label: 'История уведомлений', link: '/lk/notifications', icon: 'notifications' },
]

const goTo = (link) => {
  navigateTo(link)
  emits('click')
}
</script>

<style lang="scss" scoped>
.lk-navigation {
  padding: 20px 40px;

  background: $white;
  border-radius: 20px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  &--mobile-menu {
    padding: 0;

    background: none;
    box-shadow: none;

    .lk-navigation-link__arrow {
      display: none;
    }
  }

  &__list {
    display: grid;
    grid-gap: 16px;
  }
}

.lk-navigation-link {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 0;

  @include text_big;
  font-weight: 600;

  border-bottom: 1px solid $grayText2;

  transition: border-color 0.3s;

  &.active {
    border-color: $orange;

    .lk-navigation-link {
      &__icon {
        ::v-deep svg path {
          fill: $orange;
        }
      }

      &__arrow {
        transform: rotate(180deg);

        ::v-deep svg path {
          fill: $blackText;
        }
      }
    }
  }

  &__value {
    display: flex;
    align-items: center;
    grid-gap: 16px;
  }

  &__icon {
    ::v-deep svg path {
      fill: $grayText2;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    grid-gap: 8px;
  }

  &__arrow {
    transition: transform 0.3s;

    ::v-deep svg path {
      fill: $grayText2;
    }
  }
}
</style>