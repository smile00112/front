<template>
  <div class="brands-card">
    <div class="brands-card__image">
      <img
        src="@/assets/images/brands-card-example.png"
        alt=""
      >
    </div>

    <div class="brands-card__content">
      <p class="brands-card__title">
        Назание магазина
      </p>
      <p class="brands-card__description">
        Описание бренда Описание бренда Описание бренда Описание бренда Описание бренда Описание бренда
      </p>
    </div>

    <UIButton
      to="/brands/1"
      color="gray"
      class="brands-card__button"
    >
      В магазин
      <UIIcon name="arrow" />
    </UIButton>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.brands-card {
  width: 100%;

  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  &__image {
    height: 200px;
    border: 2px solid $grayBg2;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
  }

  &__title {
    @include text_big;
    @include overflow-text;

    font-weight: 600;
  }

  &__description {
    @include text_small;
    @include overflow-multi-text;

    font-weight: 500;
    color: $grayText;
  }

  &__button {
    font-weight: 500;
  }
}
</style>
