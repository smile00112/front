<template>
  <section class="index-banners">
    <div class="container">
      <div class="index-banners__box">
        <Swiper
          v-if="slides.length"
          :modules="[Pagination]"
          pagination
          loop
          :slides-per-view="1"
          :space-between="20"
          class="index-banners__slider"
        >
          <SwiperSlide
            v-for="(item, i) in slides"
            :key="i"
            class="index-banners-banner"
          >
            <img
              :src="item.image"
              alt=""
            >
          </SwiperSlide>
          <!-- <SwiperSlide class="index-banners-banner">
            <img src="@/assets/images/banners/2.jpg" alt="">
          </SwiperSlide> -->
        </Swiper>

        <div class="index-banners__banners">
          <img src="@/assets/images/banners/3.jpg" alt="">
          <img src="@/assets/images/banners/4.jpg" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()

// <!-- Computed -->
const slides = computed(() => commonStore.slides)
</script>

<style lang="scss" scoped>
@import 'swiper/css';

.index-banners {
  &__box {
    display: grid;
    grid-gap: 16px;

    @include mq($bp-small) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
    }
  }

  &__slider {
    width: 100%;
    
    padding-bottom: 13px;

    overflow: hidden;

    @include mq($bp-small) {
      height: calc(100% + 23px);

      padding-bottom: 23px;
    }
  }

  ::v-deep .swiper-pagination {
    top: unset;
    bottom: 0;
    left: 21px;

    display: flex;
    align-items: center;
    grid-gap: 5px;

    width: auto;

    @include mq($bp-small) {
      left: 39px;

      grid-gap: 10px;
    }

    .swiper-pagination-bullet {
      width: 9px;
      height: 2px;

      margin: 0;

      background: $grayText2;
      border-radius: 2px;

      opacity: 1;

      @include mq($bp-small) {
        width: 16px;
        height: 3px;
      }

      &.swiper-pagination-bullet-active {
        background: $blackText;
      }
    }
  }

  &__banners {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;

    @include mq($bp-small) {
      grid-gap: 20px;
    }
  }
}

.index-banners-banner {
  border-radius: 21px;
  overflow: hidden;

  @include mq($bp-small) {
    border-radius: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>