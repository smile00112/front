<template>
  <main class="index">
    <PagesIndexBanners
      class="index__banners"
    />

    <!-- <PagesIndexBrands
      class="index__brands"
    /> -->

    <PagesIndexMenu />
  </main>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.index {
  padding: 15px 0 60px;

  @include mq($bp-small) {
    padding: 40px 0;
  }

  &__banners, &__brands {
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 60px;
    }
  }
}
</style>
