export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: null,
    user: null,
    deliveryForm: null,

    addresses: [],
  }),

  actions: {
    setToken (value) {
      this.token = value
    },

    setUser (value) {
      this.user = value
    },

    updateUser (value) {
      this.user = {
        ...this.user,
        ...value
      }
    },

    setDeliveryForm (value) {
      this.deliveryForm = value
    },

    async getUserAddresses () {
      const { data } = await useFetch('/api/wp-json/wc/auth/user/get_addresses', {
        query: {
          token: this.token,
        }
      })
    },

    addAddress (value) {
      this.addresses.push(value)
    },

    editAddress (value) {
      this.addresses.find((item, i) => {
        if (item.id === value.id) {
          this.addresses[i] = {
            ...item,
            ...value
          }
          return true
        }

        return false
      })
    },
  },

  getters: {
    isAuth: (state) => {
      return !!state.user;
    },
  },

  persist: true
});
