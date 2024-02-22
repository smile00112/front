<template>
  <div class="pages-lk-orders-item">
    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--number">
      <p class="pages-lk-orders-item__number">
        № {{ item.id }}
      </p>
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--status">
      <div class="pages-lk-orders-item-status">
        Готовится
      </div>
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--date">
      <p class="pages-lk-orders-item__date">
        21:30-22:00
      </p>
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--images">
      <div class="pages-lk-orders-item__images">
        <div
          v-for="item in item.line_items.slice(0, 3)"
          :key="item.id"
          class="pages-lk-orders-item__image"
        >
          <img
            :src="item.image.src"
            alt=""
          >
        </div>
      </div>
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--price">
      <CommonPriceBlock
        :price="+item.total"
      />
    </div>

    <div class="pages-lk-orders-item__col pages-lk-orders-item__col--actions">
      <div class="pages-lk-orders-item__actions">
        <UIButton
          color="gray"
          class="pages-lk-orders-item__more"
        >
          Подробнее
        </UIButton>

        <!-- <button
          class="pages-lk-orders-item__button pages-lk-orders-item__button--cancel"
        >
          <UIIcon name="close" />
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang="scss" scoped>
.pages-lk-orders-item {
  display: grid;
  grid-template-columns: 118px 1fr 1fr;
  align-items: center;
  grid-gap: 20px;

  padding: 20px 0;

  @include mq($bp-medium) {
    display: flex;
    justify-content: space-between;
  }

  &__col {
    flex: 0 0 auto;

    display: flex;
    align-items: center;

    &--number {
      flex: 0 0 70px;
    }

    &--status {
      flex: 0 0 120px;

      @include mq($bp-medium) {
        justify-content: center;
      }
    }

    &--date {
      flex: 0 0 80px;
    }

    &--images {
      flex: 0 0 118px;
    }

    &--price {
      flex: 0 0 100px;

      padding-left: 10px;

      @include mq($bp-medium) {
        padding-left: 0;
      }
    }

    &--actions {
      flex: 0 0 192px;
    }
  }

  &__number {
    width: 94px;

    padding: 8px 0;

    @include text_mini;
    font-weight: 600;
    color: $black;
    text-align: center;

    background: $grayBg2;
    border-radius: 12px;

    @include mq($bp-medium) {
      width: auto;

      padding: 0;

      background: none;
    }
  }

  &__date {
    @include text_mini;
    color: $black;
    text-align: center;
  }

  &__images {
    display: flex;
    align-items: center;
  }

  &__image {
    width: 50px;
    height: 50px;

    margin-left: -16px;

    background: $grayBg;
    border: 1px solid $grayBg;
    border-radius: 10px;
    box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

    overflow: hidden;

    &:first-child {
      margin-left: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    grid-gap: 10px;
  }

  &__more {
    height: 34px;
    padding: 12px 10px;

    @include text_mini;
    font-weight: 500;

    @include mq($bp-medium) {
      padding: 12px 15px;

      @include text_normal;
      font-weight: 500;
    }
  }

  &__button {
    width: 56px;
    height: 34px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: none;
    border: 2px solid transparent;
    border-radius: 14px;

    ::v-deep(.ui-icon) svg {
      width: 24px;
      height: 24px;

      path {
        fill: $blackText3;
      }
    }

    &--cancel {
      border-color: $red;
    }

    &--repeat {
      border-color: $yellow;
    }
  }
}

.pages-lk-orders-item-status {
  display: flex;
  align-items: center;
  grid-gap: 6px;

  padding: 4px 12px;

  @include extra_small;
  font-weight: 600;
  color: #F2A32C;

  background: $yellowLightSecondary;
  border-radius: 16px;
}
</style>