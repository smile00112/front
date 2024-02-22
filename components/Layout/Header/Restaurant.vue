<template>
  <div
    :class="[
      'header-restaurant',
      {
        'header-restaurant--close' : isClose,
        'header-restaurant--location' : !deliveryType && !isClose,
      },
    ]"
    @click.prevent="commonStore.toggleShowReceiptModal(true)"
  >
    <div class="header-restaurant__box">
      <p class="header-restaurant__label">
        <UIIcon
          :name="icon"
          class="header-restaurant__icon"
        />
        {{ labelText }}
      </p>
      <span
        v-if="!isClose"
        class="header-restaurant__divider"
      />
      <p
        v-if="!isClose && !deliveryType"
        class="header-restaurant__value"
      >
        <span>
          Как хотите получить заказ?
          <UIIcon name="arrow" />
        </span>
        <small>
          Выберите способ получения
        </small>
      </p>
      <p
        v-else-if="!isClose"
        class="header-restaurant__value header-restaurant__value--address"
      >
        {{ valueText }}
      </p>
    </div>

    <UIIcon
      name="arrow"
      class="header-restaurant__arrow"
    />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

const selectedLocation = computed(() => commonStore.selectedLocation)
const deliveryType = computed(() => commonStore.deliveryType)

const isClose = computed(() => {
  return false
})

const icon = computed(() => {
  if (isClose.value) {
    return 'clock-filled'
  } else if (deliveryType.value) {
    return deliveryType.value
  } else {
    return 'location'
  }
})

const labelText = computed(() => {
  if (isClose.value) {
    return 'Ресторан сейчас закрыт'
  } else if (deliveryType.value === 'pickup') {
    return 'Самовывоз'
  } else if (deliveryType.value === 'delivery') {
    return 'Доставка'
  } else {
    // return 'Москва'
    return ''
  }
})

const valueText = computed(() => {
  return selectedLocation.value?.address || ''
})
</script>

<style lang="scss" scoped>
.header-restaurant {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 30px;

  height: 48px;
  padding: 0 15px;

  @include text_normal;
  font-weight: 500;

  background: $white;
  border: 1px solid $blackText;
  border-radius: 14px;

  cursor: pointer;

  @include mq($bp-small) {
    min-width: 300px;
  }

  &--close {
    color: $orange;

    border-color: $orange;

    @include mq($bp-small) {
      background: rgba(255, 102, 0, 0.11);
    }

    .header-restaurant {
      &__arrow {
        ::v-deep svg path {
          fill: $orange;
        }
      }
    }
  }

  &--location {
    padding: 0;

    border: 0;

    @include mq($bp-small) {
      padding: 0 15px;

      background: $yellowLight;
      border: 1px solid $yellow;
    }

    .header-restaurant {
      &__box {
        grid-gap: 16px;
      }

      &__label {
        display: none;

        @include mq($bp-small) {
          display: flex;

          @include text_mini;
          font-weight: 600;
        }
      }

      &__divider {
        display: none;

        @include mq($bp-small) {
          display: block;
          background: $yellow;
        }
      }

      &__value {
        @include text_small;
        font-weight: 600;

        & > span {
          .ui-icon {
            display: flex;
            grid-gap: 4px;

            transform: rotate(90deg);

            @include mq($bp-small) {
              display: none;
            }
          }
        }

        small {
          @include text_mini;
          font-weight: 400;
        }
      }

      &__arrow {
        display: none;

        @include mq($bp-small) {
          display: block;
        }
      }
    }
  }

  &__box {
    display: grid;
    grid-auto-flow: column;
    // display: flex;
    align-items: center;
    grid-gap: 10px;
  }

  &__label {
    display: flex;
    align-items: center;
    grid-gap: 10px;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }

  &__divider {
    width: 2px;
    height: 20px;
    background: $grayBg;
  }

  &__value {
    display: flex;
    flex-direction: column;
    grid-gap: 2px;

    @include overflow-text;

    &--address {
      display: block;
    }

    & > span {
      display: flex;
      align-items: center;

      .ui-icon {
        display: none;
      }
    }
  }
}
</style>