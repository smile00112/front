<template>
  <div class="add-new-address">
    <div class="add-new-address__header">
      <button
        type="button"
        class="add-new-address__back"
        @click.prevent="back()"
      >
        <UIIcon name="arrow" />
      </button>

      <p class="add-new-address__title">
        Добавьте новый адрес
      </p>
    </div>

    <div class="add-new-address__main">
      <div class="add-new-address__block">
        <div class="add-new-address__line">
          <label
            for="new_address"
            class="add-new-address__label"
          >
            Город, улица, дом
          </label>
          <div class="add-new-address-input">
            <input
              id="new_address"
              v-model="form.address"
              type="text"
              placeholder="Адрес"
              :class="[
                'add-new-address-input__area',
                {
                  'add-new-address-input__area--error' : addressError
                }
              ]"
              @input="searchAddress"
            >
            <span
              v-if="addressError"
              class="add-new-address-input__error"
            >
              Ваш адрес вне зоны доставки
            </span>

            <div
              v-if="isShowResults && results.length"
              class="add-new-address-results"
            >
              <div
                v-for="(item, i) in results"
                :key="i"
                class="add-new-address-results__item"
                @click="setAddress(item)"
              >
                {{ item.address }}
              </div>
            </div>
          </div>
        </div>

        <div class="add-new-address__lines">
          <UIInput
            v-model="form.flat"
            placeholder="Кв/офис"
            color="gray"
          />
          <UIInput
            v-model="form.entrance"
            placeholder="Подъезд"
            color="gray"
          />
          <UIInput
            v-model="form.floor"
            placeholder="Этаж"
            color="gray"
          />
          <UIInput
            v-model="form.number"
            placeholder="Домофон"
            color="gray"
          />
        </div>

        <div class="add-new-address__line">
          <UITextarea
            v-model="form.comment"
            placeholder="Комментарий курьеру"
            color="gray"
            class="add-new-address__textarea"
          />
        </div>
      </div>

      <div class="add-new-address__block">
        <div class="add-new-address__line">
          <label
            for="new_address"
            class="add-new-address__label"
          >
            Укажите название адреса
          </label>
          <UIInput
            v-model="form.name"
            placeholder="Название адреса"
            color="gray"
          />
        </div>
      </div>
    </div>

    <div class="add-new-address__footer">
      <ModalsReceiptDeliveryInfo
        :is-error="addressError"
        :condition="condition"
      />

      <UIButton
        color="yellow"
        class="add-new-address__button"
        :disabled="isButtonDisabled"
        :is-loading="isLoading"
        @click="submit()"
      >
        {{ addressId.value !== null ? 'Изменить' : 'Сохранить' }}
      </UIButton>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { useCommonStore } from '@/store/common'

const userStore = useUserStore()
const commonStore = useCommonStore()

const props = defineProps({
  deliveryCoords: {
    type: Array,
    default: null,
  },

  deliveryZone: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['setDeliveryCoords'])

const form = reactive({
  address: '',
  flat: '',
  entrance: '',
  floor: '',
  number: '',
  comment: '',
  name: '',
  coords: null,
})
const results = ref([])
const isShowResults = ref(false)
const isLoading = ref(false)

watch(() => props.deliveryCoords, (data) => {
  if (data) {
    searchByCoords(data)
  }
})

// <!-- Computed -->
const addresses = computed(() => userStore.addresses)
const addressId = computed(() => commonStore.newAddress)

const addressError = computed(() => {
  if (props.deliveryCoords && !props.deliveryZone) {
    return true
  }
  
  return false
})

const condition = computed(() => {
  if (!props.deliveryZone) {
    return null
  }

  return commonStore.conditions.find(item => item.zone === props.deliveryZone)
})

const isButtonDisabled = computed(() => {
  if (!props.deliveryZone) {
    return true
  }

  return false
})

// <!-- Methods -->
const back = () => {
  commonStore.toggleNewAddress(false)
}

const searchAddress = async () => {
  isShowResults.value = true
  results.value = []

  if (ymaps) {
    const search = await ymaps.geocode(form.address)

    const geo = search.geoObjects.toArray();

    if (geo.length) {
      results.value = geo.map(item => {
        return {
          address: item.properties.get('text'),
          coords: item.geometry.getCoordinates()
        }
      })
    }
  }
}

const setAddress = (data) => {
  isShowResults.value = false
  
  const coords = data.coords
  
  form.address = data.address
  form.coords = coords

  emits('setDeliveryCoords', coords)
}

const searchByCoords = async (coords) => {
  if (ymaps) {
    const search = await ymaps.geocode(coords)
    const obj = search.geoObjects.get(0)

    form.address = obj.properties.get('text')
    form.coords = coords
  }
}

const submit = () => {
  if (addressId.value !== null) {
    userStore.editAddress({
      id: addressId.value,
      ...form,
    })
  } else {
    const addresses = userStore.addresses
    const newId = addresses[addresses.length - 1]?.id || null

    userStore.addAddress({
      id: newId ? newId + 1 : 0,
      ...form,
    })
  }

  back()
//   const obj = {
//     data: {
//       address: form.address,
//       token: userStore.token
//     }
//   }

//   isLoading.value = true

//   const { data } = await useFetch('/api/wp-json/wc/auth/user/get_addresses', {
//     method: 'POST',
//     body: obj
//   })

//   console.log('d', data)

//   isLoading.value = false
}

const setDefault = () => {
  if (addressId.value !== null && addresses.value.length) {
    const isset = addresses.value.find(item => item.id === addressId.value)

    if (isset) {
      for (let key in form) {
        form[key] = isset[key]
      }

      ymaps.ready(() => {
        setTimeout(() => {
          emits('setDeliveryCoords', isset.coords)
        }, 1000)
      })
    }
  }
}

setDefault()
</script>

<style lang="scss" scoped>
.add-new-address {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 30px;

  padding: 50px 60px;

  &__header {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    grid-gap: 10px;
  }

  &__back {
    transform: rotate(180deg);
  }

  &__title {
    @include text_large;
    font-weight: 700;
  }

  &__main {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 30px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
  }

  &__line {
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
  }

  &__lines {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 18px;
  }

  &__label {
    @include text_small;
    font-weight: 500;
    color: $grayText;
  }

  &__textarea {
    font-weight: 500;

    ::v-deep textarea {
      height: 80px;
    }
  }

  &__footer {
    flex: 0 0 auto;

    display: flex;
    flex-direction: column;
    grid-gap: 12px;

    padding-top: 4px;

    border-top: 1px solid $grayText2;
  }

  &__button {
    font-weight: 500;
  }
}

.add-new-address-input {
  position: relative;
  width: 100%;

  &__area {
    width: 100%;
    height: 48px;

    padding: 12px 16px;

    @include text_normal;
    font-weight: 500;

    background: $grayBg;
    border: 1px solid $grayBg;
    border-radius: 14px;

    &::-webkit-input-placeholder {
      color: $grayText;
    }
    &:-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &::-moz-placeholder {
      color: $grayText;
      opacity:  1;
    }
    &:-ms-input-placeholder {
      color: $grayText;
    }
    &::-ms-input-placeholder {
      color: $grayText;
    }
    &::placeholder {
      color: $grayText;
    }

    &--error {
      border-color: $red;
    }
  }

  &__error {
    padding: 4px 0 0 16px;

    @include text_small;
    font-weight: 500;
    color: $red;
  }
}

.add-new-address-results {
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;

  max-height: 250px;

  display: flex;
  flex-direction: column;

  background: $grayBg;
  border-radius: 0 0 14px 14px;

  overflow-y: auto;
  overflow-x: hidden;

  &__item {
    padding: 5px 10px;

    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background: $grayText;
    }
  }
}
</style>