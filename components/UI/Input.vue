<template>
  <div class="input">
    <label
      v-if="label"
      :for="id"
      class="input__label"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :value="modelValue || value"
      :placeholder="placeholder"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :class="[
        'input__area',
        color ? `input__area--${color}` : ''
      ]"
      @input="emits('update:modelValue', $event.target.value)"
      @blur="emits('blur')"
      @focus="emits('focus')"
    >
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: undefined,
    default: '',
  },
  value: {
    type: undefined,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
})

const emits = defineEmits(['update:modelValue', 'blur', 'focus'])
</script>

<style lang="scss" scoped>
.input {
  width: 100%;

  &__label {
    display: block;

    @include text_normal;
    font-weight: 500;
    color: $black;

    margin-bottom: 12px;
  }

  &__area {
    width: 100%;
    height: 48px;

    padding: 12px 15px;

    @include text_normal;
    font-weight: 500;
    color: $black;

    background: $grayBg2;
    border-radius: 14px;

    &--white {
      background: $white;
      border: 1px solid $grayText2;
    }

    &--gray {
      background: $grayBg;
    }

    &:disabled {
      background: $grayBg2;
    }

    &::-webkit-input-placeholder {
      color: $grayText;
    }
    &:-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &::-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &:-ms-input-placeholder {
      color: $grayText;
    }
    &::-ms-input-placeholder {
      color: $grayText;
    }
    &::placeholder {
      color: $grayText;
    }
  }
}
</style>
