<template>
  <div class="page-order-info">
    <div class="container">
      <div
        v-if="order"
        class="page-order-info__box"
      >
        <section class="page-order-info__section">
          <div class="page-order-info__content">
            <div class="page-order-info__header">
              <span class="page-order-info__icon">
                <UIIcon name="check" />
              </span>
              <div class="page-order-info__header-info">
                <h1 class="page-order-info__title">
                  Ваш заказ успешно оформлен
                </h1>
                <p class="page-order-info__order-number">
                  Заказ № {{ order.id }}
                </p>
              </div>
            </div>

            <PagesOrderInfoProgressBlock
              :status="order.status"
            />

            <PagesOrderInfoAboutBlock
              :status="order.status"
              :info="order.shipping"
            />
          </div>

          <div class="page-order-info-buttons">
            <UIButton
              color="gray"
              class="page-order-info-buttons__button page-order-info-buttons__button--back"
              @click="navigateTo('/')"
            >
              <UIIcon
                name="arrow"
                class="page-order-info-buttons__arrow"
              />
              Вернуться в магазин
            </UIButton>
          </div>
        </section>

        <aside class="page-order-info__aside page-order-info-aside">
          <div class="page-order-info-steps page-order-info-aside__steps">
            <div class="page-order-info-step active">
              <div class="page-order-info-step__number">
                <UIIcon name="check" />
              </div>
              <p class="page-order-info-step__label">
                Корзина
              </p>
            </div>
            <div class="page-order-info-step active">
              <div class="page-order-info-step__number">
                <UIIcon name="check" />
              </div>
              <p class="page-order-info-step__label">
                Оформление заказа
              </p>
            </div>
            <div class="page-order-info-step active">
              <div class="page-order-info-step__number">
                3
              </div>
              <p class="page-order-info-step__label">
                Заказ принят
              </p>
            </div>
          </div>

          <PagesOrderInfoComposition
            :items="order.line_items"
          />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { id } = route.params

const order = ref(null)

const getOrder = async () => {
  if (!id) {
    return navigateTo('/')
  }

  const { data } = await useFetch(`/api/wp-json/wc/v3/orders/${id}`)

  const response = data?.value || null

  order.value = response
}

getOrder()
</script>

<style lang="scss" scoped>
.page-order-info {
  padding: 10px 0 60px;

  @include mq($bp-medium) {
    padding: 60px 0;
  }

  &__box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    grid-gap: 40px;

    @include mq($bp-medium) {
      flex-direction: row;
      justify-content: space-around;
    }
  }

  &__section {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 60px;

    @include mq($bp-medium) {
      max-width: 767px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
  }

  &__header {
    display: flex;
    align-items: flex-start;
    grid-gap: 20px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    background: $green;
    border-radius: 50%;

    ::v-deep(.ui-icon) svg path {
      fill: $white;
    }
  }

  &__header-info {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
  }

  &__title {
    @include h2;
    color: $black;
  }

  &__order-number {
    @include text_large;
    font-weight: 700;
    color: $grayText;
  }

  &__aside {
    width: 100%;

    @include mq($bp-medium) {
      flex: 0 0 432px;
    }
  }
}

// Aside
.page-order-info-aside {
  display: flex;
  flex-direction: column;

  &__steps {
    &.page-order-info-aside__steps {
      display: none;
      
      @include mq($bp-medium) {
        display: flex;

        margin-bottom: 60px;
      }
    }
  }
}

.page-order-info-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 33px;
}

.page-order-info-step {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 6px;

  color: $grayText;

  &:before {
    content: '';
    position: absolute;
    top: 24px;
    right: calc(50% + 24px);

    width: 120px;

    border: 1px dashed $grayText;
  }

  &:first-child {
    &:before {
      display: none;
    }
  }

  &.active {
    color: $black;

    &:before {
      border-style: solid;
    }

    .page-order-info-step {
      &__number {
        border-color: $black;
      }
    }
  }

  &__number {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    @include text_large;
    font-weight: 700;

    background: $white;
    border: 1px solid $grayText;
    border-radius: 50%;
    z-index: 1;
  }
  
  &__label {
    @include text_mini;
    font-weight: 600;
  }
}

.page-order-info-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__button {
    font-weight: 500;
  }

  &__arrow {
    transform: rotate(180deg);
  }
}
</style>