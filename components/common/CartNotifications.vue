<template>
  <div class="cart-notifications">
    <transition-group name="slide-right">
      <div
        v-for="(item, i) in notifications"
        :key="i"
        :class="[
          'cart-notification',
          `cart-notification--${item.status}`,
        ]"
      >
        <UIIcon
          v-if="item.type"
          :name="getIcon(item.type)"
          class="cart-notification__icon"
        />
        {{ item.text }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

const notifications = computed(() => commonStore.notifications)

const getIcon = (type) => {
  switch (type) {
    case 'copy':
      return 'copy'
    case 'cart':
      return 'cart-filled'
    default:
      return null
  }
}
</script>

<style lang="scss" scoped>
.cart-notifications {
  position: absolute;
  right: 0;
  bottom: calc(54px + 20px);
  left: 0;

  display: flex;
  flex-direction: column;
  grid-gap: 10px;

  @include mq($bp-small) {
    top: calc(100% + 20px);
    bottom: unset;
    left: unset;
  }
}

.cart-notification {
  display: flex;
  align-items: center;
  grid-gap: 20px;

  padding: 12px 40px;

  @include text_normal;
  font-weight: 500;

  border-radius: 20px;
  border: 1px solid transparent;

  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  @include mq($bp-small) {
    padding: 25px 40px;
  }

  &--success {
    color: $green;

    background: $greenLight;
    border-color: $greenDark;

    .cart-notification {
      &__icon {
        ::v-deep svg path {
          fill: $green;
        }
      }
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>