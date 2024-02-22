<template>
  <section class="index-menu">
    <div class="container">
      <PagesIndexMenuCategories
        id="categories" 
        @show-filters="isShowFilters = true"
        class="index-menu__categories"
      />

      <div class="index-menu__content">
        <div
          v-for="block in catalogStore.filteredCatalog"
          :key="block.id"
          :id="`block_${block.id}`"
          class="index-menu__block"
        >
          <div class="index-menu__header">
            <h2 class="index-menu__title">
              {{ block.name }}
            </h2>

            <div
              v-if="block.id === 140 || block.id === 16"
              class="index-menu__arrows"
            >
              <div :id="`slider-arrow-${block.id}--prev`" class="index-menu__arrow index-menu__arrow--prev">
                <UIIcon name="arrow" />
              </div>
              <div :id="`slider-arrow-${block.id}--next`" class="index-menu__arrow index-menu__arrow--next">
                <UIIcon name="arrow" />
              </div>
            </div>
          </div>

          <Swiper
            v-if="block.id === 140 || block.id === 16"
            :modules="[Navigation]"
            slides-per-view="auto"
            :breakpoints="{
              0: {
                spaceBetween: 15,
              },
              991: {
                spaceBetween: 30,
              }
            }"
            :navigation="{
              prevEl: `#slider-arrow-${block.id}--prev`,
              nextEl: `#slider-arrow-${block.id}--next`,
            }"
            class="index-menu__slider"
          >
            <SwiperSlide
              v-for="product in block.products"
              :key="product.id"
              class="index-menu__slide"
            >
              <CommonProductCard
                :item="product"
                :is-promo="block.id === 140"
              />
            </SwiperSlide>
          </Swiper>

          <div
            v-else
            class="index-menu__list"
          >
            <CommonProductCard
              v-for="product in block.products"
              :key="product.id"
              :item="product"
            />
          </div>
        </div>
      </div>
    </div>

    <ModalsFilters
      v-if="isShowFilters"
      @close="isShowFilters = false"
    />
  </section>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useCatalogStore } from '@/store/catalog'

const catalogStore = useCatalogStore()

const isShowFilters = ref(false)
</script>

<style lang="scss" scoped>
@import 'swiper/css';

.index-menu {
  overflow: hidden;

  &__categories {
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__block {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    margin-bottom: 20px;

    @include mq($bp-small) {
      grid-gap: 30px;

      margin-bottom: 30px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    @include text_large;
    font-weight: 700;

    @include mq($bp-small) {
      @include h2;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;

    @include mq($bp-small) {
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 25px 15px;
    }
  }

  &__slider {
    width: 100%;

    overflow: visible;
  }

  &__slide {
    width: 212px;

    @include mq($bp-small) {
      width: 316px;
    }
  }

  &__arrows {
    display: flex;
    align-items: center;
    grid-gap: 20px;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;

    background: $white;
    border-radius: 14px;
    border: 2px solid $yellow;

    cursor: pointer;

    &--prev {
      .ui-icon {
        transform: rotate(180deg);
      }
    }

    &.swiper-button-lock {
      display: none;
    }
  }
}
</style>