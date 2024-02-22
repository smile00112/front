import { useCommonStore } from '@/store/common'
import { useUserStore } from "~/store/user";
import {object} from "prop-types";

interface State {
  cart: cartItem[]
  couponsList: Coupon[]
  activeCoupon: activeCoupon | null
  promocode: Promocode | null
  isShowCartModal: boolean
}
export interface Coupon {
  amount: string;
  cart_discount: number;
  code: string;
  date_created: string;
  date_created_gmt: string;
  date_expires: string | null;
  date_expires_gmt: string | null;
  date_modified: string;
  date_modified_gmt: string;
  description: string;
  discount_type: string;
  email_restrictions: string[];
  exclude_sale_items: boolean;
  excluded_product_categories: number[];
  excluded_product_ids: number[];
  free_shipping: boolean;
  id: number;
  individual_use: boolean;
  limit_usage_to_x_items: null;
  maximum_amount: string;
  meta_data: { id: number; key: string; value: any }[];
  minimum_amount: string;
  product_categories: any[]; // Вместо any можно использовать более конкретный тип, если известно, что это должно быть
  product_ids: any[]; // То же самое
  status: string;
  usage_count: number;
  usage_limit: null;
  usage_limit_per_user: null;
  used_by: string[];
  _wc_free_gift_coupon_data_mod: any[]; // То же самое
}

interface activeCoupon {
  amount: string
  code: string
  discount_type: string
}
interface getPromoItems {
  cart_total: number;
  delivery_type: string;
  customer_id: string;
  cart_items: {
    "28893_0": {
      product: {
        id: string;
        name: string;
      };
      variation: number;
      quantity: number;
      price: number;
    };
  };
  meta_data: object[];
}

interface cartItem {
  id: number
  name: string
  price: number
  regular_price: number
  image: string
  count: number
  countable: boolean
  measure_unit: string
  portion_nat_size: number
  supplements: Supplement[]
  variation_id: number | null
  locations: number[]
}

interface Supplement {
  id: number
  name: string
  price: number
  count: number
}

interface Promocode {
  value: string
  type: string
  amount: number
}

export const useCartStore = defineStore('cartStore', {
  state: (): State => ({
    cart: [],
    promocode: null,
    couponsList: [],
    activeCoupon: {},
    isShowCartModal: false,
  }),

  actions: {
    addToCart (item) {
      const commonStore = useCommonStore()

      if (!commonStore.deliveryType) {
        commonStore.toggleShowDeliveryTypeModal(true)
        return false
      } else if (!commonStore.selectedLocation) {
        commonStore.toggleShowReceiptModal(true)
        return false
      }

      this.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        regular_price: item.regular_price,
        image: item.images[0],
        count: 1,
        countable: item.countable,
        measure_unit: item.measure_unit,
        portion_nat_size: item.portion_nat_size,
        supplements: item?.supplements || [],
        variation_id: +item?.variation_id || null,
        locations: item.locations.map(item => item.id),
      })

      commonStore.addNotification({
        type: 'cart',
        text: 'Товар добавлен в корзину',
        status: 'success'
      })
    },

    incrementItem (idx: number) {
      const commonStore = useCommonStore()

      this.cart[idx].count++

      commonStore.addNotification({
        type: 'cart',
        text: 'Товар добавлен в корзину',
        status: 'success'
      })
    },

    decrementItem (idx: number) {
      this.cart[idx].count--

      if (this.cart[idx].count === 0) {
        this.cart.splice(idx, 1)
      }
    },

    removeFromCart (idx: number) {
      this.cart.splice(idx, 1)
    },

    removeMissedProductsFromCart (locationId: number) {
      this.cart = this.cart.filter(item => item.locations.includes(locationId))
    },

    clearCart () {
      this.cart = []
      this.activeCoupon = null
      this.couponsList = []
    },

    clearCouponList () {
      this.couponsList = []
      this.activeCoupon = null
    },

    toggleShowCartModal (value: boolean) {
      this.isShowCartModal = value
    },

    async getGiftList() {
      let cartItemsRequest = {}
      const userStore = useUserStore()
      for (let index in this.cartItems) {
        if (this.cartItems.hasOwnProperty(index)) {
          const value = this.cartItems[index];
          if (value.id) {
            cartItemsRequest[value.id] = {
              product: {
                id: value.id,
                name: value.name
              },
              variation: value.variation_id ? value.variation_id : 0,
              quantity: value.count,
              price: value.price
            }
          }
        }
      }
      const { data } = await useLazyAsyncData('cart', () => $fetch('/api/wp-json/wc/v3/coupons/autoapply?consumer_key=ck_8e9043f849e95e6d003c3cc2474fc22b2ed01eec&consumer_secret=cs_74c746f821c405606c0950997a33b194ffc06876', {
        method: 'POST',
        body: {
          cart_total: this.cartItemsPrice,
          delivery_type: 'local_pickup',
          customer_id: userStore.user.id,
          cart_items: cartItemsRequest,
          meta_data: [
            {
              key: 'stock_id',
              value: '119'
            }
          ]
        }
      }))
      this.couponsList = data.value.couponsList
    },
    setActiveCoupon(coupon: activeCoupon) {
      this.activeCoupon = coupon
    },

    removeActiveCoupon() {
      this.activeCoupon = null
    },

    setPromocode (value: Promocode | null) {
      this.promocode = value
    },
  },

  getters: {
    cartItems: (state) => {
      return state.cart
    },

    cartItemsLength: (state) => {
      return state.cart.reduce((acc, item) => {
        const count = !item.countable ? 1 : item.count

        acc = acc + count
        return acc
      }, 0)
    },

    // Сумма всех товаров с учетом скидки
    cartItemsPrice: (state) => {
      return state.cart.reduce((acc, item) => {
        let price = +item.price

        if (item.supplements.length) {
          price += item.supplements.reduce((acc2, item2) => {
            acc2 += item2.price * item2.count
            return acc2
          }, 0)
        }

        acc += item.count * price
        return acc
      }, 0)
    },

    // Сумма всех товаров без скидки
    cartItemsRegularPrice: (state) => {
      return state.cart.reduce((acc, item) => {
        let price = +item.regular_price

        if (item.supplements.length) {
          price += item.supplements.reduce((acc2, item2) => {
            acc2 += item2.price * item2.count
            return acc2
          }, 0)
        }

        acc += item.count * price
        return acc
      }, 0)
    },

    productInCart: (state) => {
      return (id: number, supplements: Supplement[] = [], variationId: number | null = null) => {
        let idx = null

        const item = state.cart.find((item, i) => {
          if (
            item.id === id &&
            item?.variation_id === variationId &&
            supplements.length === item.supplements.length &&
            item.supplements.every(itemSupplement => supplements.find(supplement => supplement.id === itemSupplement.id && supplement.count === itemSupplement.count))
          ) {
            idx = i
            return true
          }

          return false
        })

        return {
          item: item || null,
          idx
        }
      }
    },

    missedProductsList: (state) => {
      return (locationId: number) => {
        return state.cart.filter(item => !item.locations.includes(locationId))
      }
    }
  },

  persist: {
    storage: persistedState.localStorage,
    paths: ['cart']
  },
})