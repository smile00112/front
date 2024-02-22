<template>
  <div class="page-lk-orders">
    <h2 class="page-lk-orders__title">
      Мои заказы
    </h2>

    <div
      v-if="!isLoading"
      class="page-lk-orders-list"
    >
      <PagesLkOrdersItem
        v-for="(item, i) in orders"
        :key="i"
        :item="item"
        class="page-lk-orders-list__item"
      />
    </div>
    <div
      v-else
      class="page-lk-orders__loader"
    >
      <UILoader is-big />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const config = useRuntimeConfig()

const isLoading = ref(false)
const orders = ref([])

// Computed
const user = computed(() => userStore.user)

// Methods
const getOrders = async () => {
  isLoading.value = true

  const { data } = await useFetch('/api/wp-json/wc/v2/orders', {
    query: {
      customer: user.value.id,
      consumer_key: config.public.CONSUMER_KEY,
      consumer_secret: config.public.CONSUMER_SECRET,
    },
  })

  isLoading.value = false

  orders.value = data?.value || []
}

getOrders()
</script>

<style lang="scss" scoped>
.page-lk-orders {
  display: grid;
  grid-gap: 20px;

  &__title {
    display: none;

    @include mq($bp-medium) {
      display: block;
      @include text_large;
      font-weight: 700;
      color: $black;
    }
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 100px 0;
  }
}

.page-lk-orders-list {
  display: flex;
  flex-direction: column;

  &__item {
    border-bottom: 1px solid $grayText2;
  }
}
</style>

