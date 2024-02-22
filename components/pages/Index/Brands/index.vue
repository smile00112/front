<template>
  <div class="index-brands">
    <div class="container">
      <div class="index-brands__header">
        <h2 class="index-brands__title">
          Бренды
        </h2>

        <UIButton
          to="/brands"
          color="gray"
          class="index-brands__button"
        >
          Все бренды
          <UIIcon name="arrow" />
        </UIButton>
      </div>

      <div class="index-brands__slider index-brands-slider">
        <Swiper
          :modules="[Navigation]"
          :slides-per-view="'auto'"
          :navigation="{
            prevEl: prev,
            nextEl: next,
          }"
          :breakpoints="{
            0: {
              spaceBetween: 10,
            },
            767: {
              spaceBetween: 40,
            }
          }"
        >
          <SwiperSlide
            v-for="i in 10"
            :key="i"
            class="index-brands-slider__slide"
          >
            <NuxtLink
              to="/brands/1"
              class="index-brands-brand"
            >
              <div class="index-brands-brand__image">
                <img src="@/assets/images/brand-example.png" alt="">
              </div>
              <p class="index-brands-brand__name">
                Название магазина
              </p>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>

        <div ref="prev" class="index-brands-slider__arrow index-brands-slider__arrow--prev">
          <UIIcon name="arrow" />
        </div>
        <div ref="next" class="index-brands-slider__arrow index-brands-slider__arrow--next">
          <UIIcon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const prev = ref(null)
const next = ref(null)

</script>

<style lang="scss" scoped>
.index-brands {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 23px;

    @include mq($bp-small) {
      margin-bottom: 30px;
    }
  }

  &__title {
    @include text_large;
    font-weight: 700;

    @include mq($bp-small) {
      @include h2;
    }
  }

  &__button {
    // grid-gap: 6px;
    
    // padding: 0;

    font-weight: 500;
    // color: $grayText;

    // background: none;

    // @include mq(0, $bp-small) {
      
    // }

    ::v-deep(.ui-icon) svg path {
      fill: $blackText3;
    }
  }
}

.index-brands-slider {
  position: relative;

  &:hover {
    .index-brands-slider {
      &__arrow {
        opacity: 1;
      }
    }
  }

  .swiper {
    margin: 0 -20px;
    padding: 0 20px;

    @include mq($bp-small) {
      margin: 0;
      padding: 0;
    }
  }

  &__slide {
    width: auto;
  }

  &__arrow {
    display: none;

    @include mq($bp-small) {
      position: absolute;
      top: 50px;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 60px;
      height: 60px;

      background: $white;
      border-radius: 50%;
      box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.05);

      opacity: 0;

      transition: opacity 0.3s;
      cursor: pointer;
      z-index: 1;

      ::v-deep(.ui-icon) svg {
        width: 40px;
        height: 40px;
      }

      &--prev {
        left: -30px;

        .ui-icon {
          transform: rotate(180deg);
        }
      }

      &--next {
        right: -30px;
      }
    }
  }
}

.index-brands-brand {
  display: flex;
  flex-direction: column;
  grid-gap: 18px;

  width: 160px;

  &__image {
    width: 100%;
    height: 160px;

    border: 2px solid $grayBg2;
    border-radius: 20px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__name {
    display: none;

    @include mq($bp-small) {
      display: block;

      @include overflow-text;

      @include text_big;
      font-weight: 600;
    }
  }
}
</style>
