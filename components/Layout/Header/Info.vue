<template>
  <div class="header-info">
    <a
      href="tel:+79191232340"
      target="_blank"
      class="header-info__phone"
    >
      +7 919 123 23 40
    </a>
    <p class="header-info__time">
      <UIIcon name="clock" />
      c 9:00 до 20:00
    </p>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.header-info {
  display: none;

  @include mq($bp-medium) {
    display: flex;
    flex-direction: column;
    grid-gap: 4px;
  }

  &__phone {
    @include text_small;
    font-weight: 600;
  }

  &__time {
    @include text_mini;

    display: flex;
    align-items: center;
    grid-gap: 5px;

    color: $grayText;

    .ui-icon {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
