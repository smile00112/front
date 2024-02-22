<template>
  <component
    :is="component"
    :to="to"
    :type="type"
    :disabled="isDisabled"
    :class="[
      'button',
      color ? `button--${color}` : '',
      size ? `button--${size}` : '',
    ]"
  >
    <UILoader
      v-if="isLoading"
      class="button__loader"
    />

    <slot v-else />
  </component>
</template>

<script setup>
import { NuxtLink } from '#components'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const component = computed(() => {
  if (props.to) {
    return NuxtLink
  }

  return 'button'
})

const isDisabled = computed(() => {
  return props.disabled || props.isLoading
})
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  min-width: 80px;
  height: 48px;

  padding: 12px 15px;

  @include text_normal;

  background: none;
  border: 0;
  border-radius: 14px;

  transition: background-color 0.3s;

  &--small {
    height: 32px;

    font-size: 14px;

    padding: 6px 15px;
  }

  &--yellow {
    background: $yellow;

    &:hover {
      background: $yellowDark;
    }

    &:disabled {
      color: rgba(0, 0, 0, 0.30);
      background: $yellowLight;
    }
  }

  &--yellow-outline {
    border: 2px solid $yellow;
  }

  &--yellow-light {
    background: $yellowLight;
  }

  &--gray {
    background: $grayBg;

    &:hover:enabled {
      background: $grayBg2;
    }
  }

  &--orange {
    color: $white;
    background: $orange;
  }

  &:disabled {
    cursor:not-allowed;
  }
}
</style>
