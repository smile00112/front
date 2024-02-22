<template>
  <div
    ref="box"
    class="header-search"
  >
    <span class="header-search__icon">
      <UIIcon name="loop" />
    </span>

    <UIInput
      v-model="search"
      placeholder="Поиск"
      @focus="showResults()"
      class="header-search__field"
    />

    <transition name="slide-top" mode="out-in">
      <div
        v-if="isShow"
        class="header-search-box"
      >
        <div class="header-search-box__content">
          <div class="header-search-box__list">
            <LayoutHeaderSearchItem
              v-for="(item, i) in results"
              :key="i"
              :item="item"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useCatalogStore } from '@/store/catalog'

const catalogStore = useCatalogStore()

const { filteredCatalog } = storeToRefs(catalogStore)

const isShow = ref(false)
const search = ref('')
const box = ref(null)

watch(() => search.value, () => {
  showResults()
})

// <!-- Computed -->
const results = computed(() => {
  if (search.value) {
    let array = []
    filteredCatalog.value.forEach(item => {
      if (+item.id === 140 || +item.id === 16) return
      const products = item.products.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()))

      array = array.concat(products)
    })

    return array
  }

  return []
})

const showResults = () => {
  if (search.value) {
    isShow.value = true
  }
}

const listener = (e) => {
  if (e.target == box.value || e.composedPath().includes(box.value)) {
    return
  }

  isShow.value = false
}

onMounted(() => {
  document.addEventListener('click', listener)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', listener)
})
</script>

<style lang="scss" scoped>
.header-search {
  position: relative;

  &__icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);

    z-index: 2;
  }

  &__field {
    position: relative;

    font-weight: 500;

    z-index: 1;

    ::v-deep input {
      padding-left: 49px;

      background: $grayBg;
    }
  }
}

.header-search-box {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;

  padding: 58px 10px 10px;
  
  background: $white;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 30px;

    max-height: 562px;

    padding: 30px 0;
  }

  &__list {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 20px;

    overflow: auto;
  }
}
</style>
