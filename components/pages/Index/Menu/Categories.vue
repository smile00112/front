<template>
  <div class="index-menu-categories">
    <div
      class="index-menu-categories__tabs-wrap"
      @focusout="isShowMore = false"
    >
      <div
        id="category-tabs"
        class="index-menu-categories__tabs"
      >
        <button
          v-for="item in categories"
          :key="item.id"
          :id="`category-tab-${item.id}`"
          type="button"
          :class="['index-menu-categories-tab', { 'active' : activeTab === item.id }]"
          @click.prevent="scrollTo(item.id)"
        >
          {{ item.name }}
        </button>

        <button
          ref="elseBtn"
          type="button"
          class="index-menu-categories-tab"
          @click.prevent="toggleShowMore"
        >
          Ещё+
        </button>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div
        v-if="isShowMore"
        :style="`left: ${dropdownLeftPosition}px`"
        class="index-menu-categories-dropdown"
      >
        <div
          v-for="(item, i) in categoriesElse"
          :key="i"
          class="index-menu-categories-dropdown__item"
          @click.prevent="scrollTo(item.id), isShowMore = false"
        >
          {{ item.name }}
        </div>
      </div>
    </transition>

    <CommonFilterButton
      @click="emits('showFilters')"
    />
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'

import scrollToEl from '@/utils/scrollToEl'

const catalogStore = useCatalogStore()

const emits = defineEmits(['showFilters'])

const activeTab = ref(null)
const categories = ref([])
const categoriesElse = ref([])

const elseBtn = ref(null)
const dropdownLeftPosition = ref(0)

const isShowMore = ref(false)
const positions = []
const HEIGHT = 80

// <!-- Methods -->
const toggleShowMore = () => {
  dropdownLeftPosition.value = elseBtn.value.offsetLeft
  isShowMore.value = !isShowMore.value
}

const scrollTo = (id) => {
  activeTab.value = id

  scrollToEl(`block_${id}`, HEIGHT * -1)
}

const onScroll = (e) => {
  const scrollPosition = (window.pageYOffset || document.documentElement.scrollTop) + HEIGHT

  if (scrollPosition < positions[0]?.top) {
    return activeTab.value = positions[0]?.id || null
  }

  const isset = positions.find(item => {
    if (scrollPosition >= item.top && scrollPosition <= item.bottom) {
      activeTab.value = item.id

      const tabs = document.getElementById('category-tabs')

      const el = document.getElementById(`category-tab-${item.id}`)
      if (el) {
        tabs.scroll({
          left: el.offsetLeft,
          behavior: 'smooth'
        })
      }

      return true
    }

    return false
  })

  if (!isset) {
    activeTab.value = null
  }
}

const getBlocksPositions = () => {
  categories.value.forEach(item => {
    const el = document.getElementById(`block_${item.id}`)

    if (el) {
      positions.push({
        id: item.id,
        top: el.offsetTop,
        bottom: el.offsetTop + el.scrollHeight,
      })
    }
  })
}

const getCategories = () => {
  const arr = catalogStore.categories

  categories.value = arr.slice(0, 9)
  categoriesElse.value = arr.slice(9, arr.length)
}

onMounted(() => {
  getCategories()

  nextTick(() => {
    activeTab.value = categories.value[0]?.id || null
    getBlocksPositions()
    document.addEventListener('scroll', onScroll)
  })
})
</script>

<style lang="scss" scoped>
.index-menu-categories {
  // position: sticky;
  // top: 0;

  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  grid-gap: 16px;

  z-index: 10;

  @include mq($bp-small) {
    flex-direction: row;

    padding: 8px;

    background: $grayBg2;
    border-radius: 20px;
  }

  &__tabs-wrap {
    height: 48px;

    margin: 0 -20px 0 0;

    overflow: hidden;

    @include mq($bp-small) {
      margin: 0;
    }
  }

  &__tabs {
    position: relative;

    display: flex;
    align-items: center;
    grid-gap: 7px;

    padding-right: 20px;
    padding-bottom: 20px;

    overflow-x: auto;

    @include mq($bp-small) {
      margin: 0;
      padding: 0;
    }
  }
}

.index-menu-categories-tab {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;

  padding: 12px 15px;

  @include text_normal;
  font-weight: 500;
  white-space: nowrap;

  background: $grayBg2;
  border-radius: 14px;
  border: 2px solid $grayBg2;

  transition: background-color 0.3s;

  @include mq($bp-small) {
    background: none;
    border-color: $grayBg2;
  }

  &:hover {
    background-color: $white;
    border-color: transparent;
  }

  &.active {
    background-color: $white;
    border-color: $yellow;
  }
}

.index-menu-categories-dropdown {
  position: absolute;
  top: 100%;
  left: 0;

  width: 260px;

  display: grid;

  padding: 12px 20px;

  background: $white;
  border-radius: 20px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.08);
  z-index: 100;

  &__item {
    padding: 8px 0;

    @include overflow-text;
    @include text_small;
    font-weight: 600;
    color: $black;

    cursor: pointer;
  }
}
</style>
