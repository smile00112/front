import { useCommonStore } from '@/store/common'

export const useCatalogStore = defineStore('catalogStore', {
  state: () => ({
    catalog: [],
    selectedProductId: null, // select product for modal

    favorites: [],
  }),

  actions: {
    async getCatalog () {
      const { data } = await useLazyAsyncData('catalog', () => $fetch('/api/wp-content/uploads/app_sync/prodcat.json'))

      const catalog = (data?.value || []).map(item => {
        const products = item.products.map(product => {
          if (product) {
            return {
              ...product,
              catalog_name: item.name
            }
          }
          return null
        }).filter(item => item)

        return {
          id: item.id,
          name: item.name,
          products,
        }
      }).filter(item => item?.products?.length)

      this.catalog = catalog
    },

    setProduct (data = null) {
      this.selectedProductId = data
    },

    addToFavorite (value) {
      const commonStore = useCommonStore()

      this.favorites.push(value)

      commonStore.addNotification({
        type: null,
        text: 'Товар добавлен в избранное',
        status: 'success'
      })
    },

    removeFromFavorite (value) {
      const commonStore = useCommonStore()

      this.favorites.find((item, i) => {
        if (item === value) {
          this.favorites.splice(i, 1)

          commonStore.addNotification({
            type: null,
            text: 'Товар удален из избранного',
            status: 'success'
          })
          return true
        }
        return false
      })
    },
  },

  getters: {
    filteredCatalog: (state) => {
      const commonStore = useCommonStore()
      const warehouseId = commonStore.selectedLocation?.warehouse_id || null

      const blockedArray = ['uncategorized']
      const catalog = state.catalog.filter(item => {
        let status = true
        blockedArray.forEach(blocked => {
          if (item.name.toLowerCase().includes(blocked)) {
            status = false
          }
        })
        return status
      })

      if (warehouseId) {
        return catalog.map(item => {
          const products = item.products.filter(product => {
            return product.locations.find(location => location.id === warehouseId)
          })

          return {
            ...item,
            products
          }
        }).filter(item => item.products.length)
      }

      return catalog
    },

    categories () {
      return this.filteredCatalog.map(item => {
        return {
          id: item.id,
          name: item.name,
        }
      })
    },

    ingredients: (state) => {
      return state.catalog.find(item => item.id === 135)?.products || []
    },

    relatedItems: (state) => {
      return (related) => {
        const array = []

        related.forEach(id => {
          state.catalog.find(item => {
            const product = item.products.find(product => +product.id === +id)
            if (product) {
              array.push(product)
              return true
            }
            return false
          })
        })

        return array
      }
    },

    selectedProduct: (state) => {
      let data = null
      const productId = state.selectedProductId

      state.catalog.find(item => {
        item.products.find(product => {
          if (+product.id === +productId) {
            data = product
            return true
          }
          return false
        })
      })

      return data
    },

    isShowProductModal: (state) => {
      return !!state.selectedProductId
    },

    isProductFavorite: (state) => {
      return (productId) => {
        return state.favorites.includes(productId)
      }
    },

    favoriteProducts: (state) => {
      const arr = []
      const blockedArray = ['новинки', 'акции']

      state.catalog.forEach(item => {
        let isFind = true
        blockedArray.forEach(blocked => {
          if (item.name.toLowerCase().includes(blocked)) {
            isFind = false
          }
        })
        
        if (isFind) {
          item.products.forEach(product => {
            if (state.favorites.includes(product.id)) {
              arr.push(product)
            }
          })
        }
      })

      return arr
    },
  },

  persist: {
    storage: persistedState.localStorage,
    paths: ['favorites']
  },
})
