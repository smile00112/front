<template>
  <div class="page-lk-referals">
    <h2 class="page-lk-referals__title">
      Реферальная система
    </h2>

    <template v-if="!isLoading">
      <div class="page-lk-referals__card page-lk-referals-card">
        <div class="page-lk-referals-card__content">
          <UIIcon
            name="referals"
            class="page-lk-referals-card__icon"
          />
          <div class="page-lk-referals-card__info">
            <p class="page-lk-referals-card__title">
              Пригласи друга!
            </p>
            <p class="page-lk-referals-card__text">
              Получи <b>{{ amount }} ₽</b> за его первый заказ
            </p>
          </div>
        </div>

        <UIButton
          color="yellow"
          class="page-lk-referals-card__button"
        >
          <UIIcon name="add" />
          Пригласить друга
        </UIButton>
      </div>

      <div class="page-lk-referals__cols">
        <div class="page-lk-referals-promocode">
          <p class="page-lk-referals-promocode__label">
            Твой промокод
          </p>
          <button
            type="button"
            class="page-lk-referals-code"
            @click.prevent="copyCode(code)"
          >
            <span class="page-lk-referals-code__value">
              {{ code }}
            </span>
            <span class="page-lk-referals-code__divider" />
            <span class="page-lk-referals-code__icon">
              <UIIcon name="copy" />
            </span>
          </button>
        </div>
        <p class="page-lk-referals__text">
          {{ text }}
        </p>
      </div>
    </template>

    <div
      v-else
      class="page-lk-referals__loader"
    >
      <UILoader is-big />
    </div>
  </div>
</template>

<script setup lang="ts">
import copyTextToClipboard from '@/utils/copyTextToClipboard'

import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/user'

const commonStore = useCommonStore()
const userStore = useUserStore()

const isLoading = ref(false)
const amount = ref(0)
const code = ref('')
const text = ref('')

const user = computed(() => userStore.user)

const copyCode = async (value: string) => {
  try {
    await copyTextToClipboard(value)

    commonStore.addNotification({
      type: 'copy',
      text: 'Промокод скопирован',
      status: 'success',
    })
  } catch (e) {
    commonStore.addNotification({
      type: 'copy',
      text: 'Промокод не скопирован',
      status: 'fail',
    })
  }
}

const getReferals = async () => {
  isLoading.value = true

  const { data } = await useFetch('/api/wp-json/systeminfo/v1/coupons/referal_info', {
    query: {
      user_id: user.value.id
    }
  })

  isLoading.value = false

  const obj = data?.value || null
  if (obj) {
    amount.value = obj.amount
    code.value = obj.coupon
    text.value = obj.text
  }
}

getReferals()
</script>

<style lang="scss" scoped>
.page-lk-referals {
  display: grid;
  grid-gap: 40px;

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include text_large;
      font-weight: 700;
      color: $black;
    }
  }

  &__cols {
    display: grid;
    grid-gap: 20px;

    @include mq($bp-medium) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 60px;
    }
  }

  &__text {
    @include text_normal;
    font-weight: 500;
    color: $black;
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 100px 0;
  }
}

.page-lk-referals-card {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  padding: 20px 40px;

  background: $white;
  border-radius: 20px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  @include mq($bp-medium) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    align-items: center;
    grid-gap: 30px;
  }

  &__icon {
    ::v-deep svg {
      width: 32px;
      height: 32px;
      
      path {
        fill: $blue;
      }
    }
  }

  &__info {
    display: grid;
    grid-gap: 6px;
  }

  &__title {
    @include text_big;
    font-weight: 600;
    color: $blue;
  }

  &__text {
    @include text_small;
  }

  &__button {
    font-weight: 500;
  }
}

.page-lk-referals-promocode {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  @include mq($bp-medium) {
    flex-direction: row;
    align-items: center;
    grid-gap: 30px;
  }

  &__label {
    @include text_big;
    font-weight: 600;
    color: $black;
  }
}

.page-lk-referals-code {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  grid-gap: 15px;

  width: 100%;
  height: 48px;

  padding: 0 15px 0 25px;

  background: $white;
  border-radius: 14px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);

  @include mq($bp-medium) {
    width: 183px;
  }

  &__value {
    flex: 1 1 auto;

    @include overflow-text;
    @include text_normal;
    font-weight: 500;
  }

  &__divider {
    flex: 0 0 auto;
    width: 2px;
    height: 20px;

    background: rgba(0, 0, 0, 0.3);
  }

  &__icon {
    flex: 0 0 auto;
  }
}
</style>
