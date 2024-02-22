<template>
  <UICounter
    v-if="!!item"
    :count="countLabel"
    @increment="increment()"
    @decrement="decrement()"
    :class="['add-button add-button--counter active', { 'add-button--small' : isSmall }]"
  />

  <button
    v-else
    type="submit"
    :disabled="disabled"
    :class="[
      'add-button',
      {
        'add-button--reverse' : props.productType === 'simple',
        'add-button--small' : isSmall
      }
    ]"
    @click.stop.prevent="click()"
  >
    {{ buttonLabel }}
    <UIIcon
      :name="buttonIcon"
    />
  </button>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },

  productType: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  isSmall: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['increment', 'decrement', 'click', 'add'])

// <!-- Computed -->
const countLabel = computed(() => {
  if (props.item) {
    const value = parseInt((+props.item.portion_nat_size * +props.item.count) * 100) / 100
    return `${value} ${props.item.measure_unit}`
  }

  return null
})

const buttonLabel = computed(() => {
  switch (props.productType) {
    case 'simple':
      return 'В корзину'
    case 'supplements':
      return 'Собрать'
    default:
      return 'Выбрать'
  }
})

const buttonIcon = computed(() => {
  let icon = 'arrow'

  if (props.productType === 'simple') {
    icon = 'add'
  }

  return icon
})

// <!-- Methods -->
const click = () => {
  if (props.productType === 'simple') {
    emits('add')
  } else {
    emits('click')    
  }
}

const increment = () => {
  emits('increment')
}

const decrement = () => {
  emits('decrement')
}
</script>

<style lang="scss" scoped>
.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 10px;

  width: 100%;
  height: 48px;

  padding: 0;

  @include text_normal;
  font-weight: 500;

  background: $grayBg;
  border: 2px solid transparent;
  border-radius: 14px;

  white-space: nowrap;

  transition: border-color 0.3s, background-color 0.3s;

  @include mq($bp-small) {
    padding: 0 20px;
  }

  &--reverse {
    flex-direction: row-reverse;
  }

  &--counter {
    justify-content: space-between;
  }

  &--small {
    height: 32px;

    padding: 0;

    @include text_small;
    font-weight: 500;
  }

  &:hover:enabled, &.active {
    background: $white;
    border-color: $yellowDark;
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>