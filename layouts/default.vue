<template>
  <div :class="['layout-default']">
    <LayoutHeader />

    <slot />

    <LayoutFooter />

    <LayoutBottomBar />

    <LazyModalsProduct
      v-if="catalogStore.isShowProductModal"
    />

    <LazyModalsCart
      v-if="isShowCartModal"
    />

    <LazyModalsReceipt
      v-if="isShowReceiptModal"
    />

    <LazyModalsAuth
      v-if="isShowAuthModal"
    />

    <LazyModalsSettings
      v-if="isShowSettingsModal"
    />

    <LazyModalsAcceptCity
      v-if="isShowAcceptCityModal"
    />

    <LazyModalsDeliveryType
      v-if="isShowDeliveryTypeModal"
    />
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'
import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common'

const catalogStore = useCatalogStore()

const cartStore = useCartStore()
const commonStore = useCommonStore()

const isShowCartModal = computed(() => cartStore.isShowCartModal)

const isShowReceiptModal = computed(() => commonStore.isShowReceiptModal)
const isShowAuthModal = computed(() => commonStore.isShowAuthModal)
const isShowSettingsModal = computed(() => commonStore.isShowSettingsModal)
const isShowAcceptCityModal = computed(() => commonStore.isShowAcceptCityModal)
const isShowDeliveryTypeModal = computed(() => commonStore.isShowDeliveryTypeModal)
</script>

<style lang="scss" scoped>
.layout-default {
  padding-top: 70px;
  
  @include mq($bp-medium) {
    padding-top: 80px;
  }
}
</style>