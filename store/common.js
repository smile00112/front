import trimStr from '@/utils/trimStr'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    isMobileOrTablet: false,
    isTablet: false,
    city: null,
    deliveryType: null, // 'pickup' | 'delivery' | 'lounge' | null
    deliveryTypes: [], // [{ label: '', type: '' }, ...,]

    // deliveryLocations: [],
    // pickupLocations: [],
    mapCenter: null, // null | [] - точка центра карты
    conditions: [], // точки доставки
    zones: [], // зоны доставки
    pickups: [], // точки самовывоза
    lounges: [],
    selectedLocation: null, // выбранная локация

    isShowReceiptModal: false,
    newAddress: false, // false - hidden, null - visible and empty, { id } - visible and find address by id
    isShowAuthModal: false,
    isShowSettingsModal: false,
    isShowAcceptCityModal: false,
    isShowDeliveryTypeModal: false,
    isShowAcceptModal: false,

    missedProductsModal: null, // null | { type, location }

    notifications: [],
    slides: [],
  }),

  actions: {
    async getPickups () {
      const { data } = await useLazyAsyncData('methods', () => $fetch('/api/wp-json/systeminfo/v1/shipping_methods'))
      // {
      //   cart_total: 2820,
      //       delivery_type: 'local_pickup',
      //     customer_id: '1',
      //     cart_items: {
      //   '28893_0': {
      //     product: {
      //       id: '28893',
      //           name: ''
      //     },
      //     variation: 0,
      //         quantity: 6,
      //         price: 470
      //   }
      // },
      //   meta_data: [
      //     {
      //       key: 'stock_id',
      //       value: '119'
      //     }
      //   ]
      // }
      const array = data?.value || []
      this.deliveryTypes = []

      if (array.length) {
        array.forEach((item, i) => {
          if (item.id === 'flat_rate') {
            this.deliveryTypes.push({
              label: item.name,
              type: 'delivery'
            })
          } else if (item.id === 'local_pickup') {
            const pickups = item.pickup_locations

            if (pickups.length) {
              this.pickups = pickups
              this.deliveryTypes.push({
                label: item.name,
                type: 'pickup'
              })
            }
          } else if (item.id === 'wcso_booking') {
            const restaurants = item.restaurants

            if (restaurants.length) {
              this.lounges = restaurants
              this.deliveryTypes.push({
                label: item.name,
                type: 'lounge'
              })
            }
          }
        })
      }
    },

    async getDelivery () {
      const data = await Promise.allSettled([
        useLazyAsyncData('delivery', () => $fetch('/api/wp-json/systeminfo/v1/delivery')),
        useLazyAsyncData('map', () => $fetch('/api/wp-json/system/map'))
      ])

      const delivery = data[0]?.value?.data?.value || null
      const zones = data[1]?.value?.data?.value || null

      if (delivery) {
        this.conditions = delivery?.conditions || []
      }

      if (zones) {
        const features = zones?.map?.features || []

        this.zones = features.map(item => {
          if (item.geometry.type === 'Point') {
            this.mapCenter = item.geometry.coordinates
            return false
          }

          const options = {
            fillColor: item.properties.fill,
            fillOpacity: item.properties['fill-opacity'],
            strokeColor: item.properties.stroke,
            strokeOpacity: item.properties['stroke-opacity'],
            strokeWidth: item.properties['stroke-width'],
          }

          const zone = item.properties.description.split('#cid=')

          return {
            id: item.id.toString(),
            geometry: item.geometry,
            options,
            zone: zone && zone[1] || '',
          }
        }).filter(item => item)
      }
    },

    async getBanners () {
      const { data } = await useLazyAsyncData('banners', () => $fetch('/api/banners-json'))

      const obj = data?.value || []
    
      if (obj.length) {
        this.slides = obj.filter(item => item.gallery === 'desctop_slider')
      }
    },

    addNotification (value) {
      this.notifications.push(value)

      setTimeout(() => {
        this.notifications.splice(0, 1)
      }, 2000)
    },

    setDeliveryType (value) {
      this.deliveryType = value
    },

    setLocation (value) {
      this.selectedLocation = value
    },

    toggleShowReceiptModal (value) {
      this.isShowReceiptModal = value
    },

    toggleNewAddress (value) {
      this.newAddress = value
    },

    toggleShowAuthModal (value) {
      this.isShowAuthModal = value
    },

    toggleShowSettingsModal (value) {
      this.isShowSettingsModal = value
    },

    toggleShowAcceptCityModal (value) {
      this.isShowAcceptCityModal = value
    },

    toggleShowDeliveryTypeModal (value) {
      this.isShowDeliveryTypeModal = value
    },

    toggleShowAcceptModal (value) {
      this.isShowAcceptModal = value
    },

    setMissedProductsModal (value) {
      this.missedProductsModal = value
    }
  },

  getters: {
    pickupLocations: (state) => {
      return (type) => {
        let arr = null
        if (type === 'pickup') {
          arr = state.pickups
        } else if (type === 'lounge') {
          arr = state.lounges
        }

        if (!!arr) {
          return arr.map(item => {
            return {
              ...item,
              id: item.id.toString(),
              coordinates: trimStr(item.coord).split(',').reverse().map(item => item * 1)
            }
          })
        }
        return []
      }
    }
  },

  persist: {
    paths: ['deliveryType', 'selectedLocation']
  },
})