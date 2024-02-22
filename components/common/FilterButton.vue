<template>
  <button
    type="button"
    class="filter-button"
    @click.prevent="emits('click')"
  >
    <UIIcon name="filter" />
    <!-- <span class="index-menu-categories-filter__line" />
    3 -->
  </button>
</template>

<script setup>
const emits = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.filter-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;

  padding: 0 16px;
  
  font-size: 0;

  background: $grayBg;
  border-radius: 14px;

  @include mq($bp-small) {
    grid-gap: 10px;

    @include text_normal;
    color: $orange;

    background: $white;
  }

  &__line {
    display: none;

    @include mq($bp-small) {
      display: block;
      width: 2px;
      height: 20px;

      background: #D9D9D9;
      border-radius: 2px;
    }
  }
}
</style>