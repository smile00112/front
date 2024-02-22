<template>
  <button
    type="button"
    class="lang"
    @click.prevent="commonStore.toggleShowSettingsModal(true)"
  >
    <span class="lang__box">
      RU

      <img src="@/assets/images/flags/ru.png" alt="">
    </span>
  </button>
</template>

<script setup>
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()
</script>

<style lang="scss" scoped>
.lang {
  position: relative;

  cursor: pointer;

  &__box {
    display: flex;
    align-items: center;
    grid-gap: 12px;

    @include text_normal;
    font-weight: 500;
    color: $grayText2;
  }
}
</style>