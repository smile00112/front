<template>
  <CommonBottomSheet>
    <form
      class="modal-receipt-delivery-mobile-form"
      @submit.prevent="onSubmit()"
    >
      <label
        for="address"
        class="modal-receipt-delivery-mobile-form__label"
      >
        Город, улица, дом
      </label>
      <div class="modal-receipt-delivery-mobile-form__line">
        <div class="modal-receipt-delivery-mobile-form-input">
          <input
            id="address"
            v-model="form.address"
            type="text"
            placeholder="Адрес"
            :class="[
              'modal-receipt-delivery-mobile-form-input__area',
              {
                'modal-receipt-delivery-mobile-form-input__area--error' : addressError,
                'modal-receipt-delivery-mobile-form-input__area--opened' : isShowResults && results.length
              }
            ]"
            @input="searchAddress"
          >
          <span
            v-if="addressError"
            class="modal-receipt-delivery-mobile-form-input__error"
          >
            Ваш адрес вне зоны доставки
          </span>

          <div
            v-if="isShowResults && results.length"
            class="modal-receipt-delivery-mobile-form-results"
          >
            <div
              v-for="(item, i) in results"
              :key="i"
              class="modal-receipt-delivery-mobile-form-results__item"
              @click="setAddress(item)"
            >
              {{ item.address }}
            </div>
          </div>
        </div>
      </div>
      <div class="modal-receipt-delivery-mobile-form__line modal-receipt-delivery-mobile-form__line--cols">
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
      <div class="modal-receipt-delivery-mobile-form__line">
        <UITextarea
          v-model="form.comment"
          placeholder="Комментарий курьеру"
          color="gray"
          class="modal-receipt-delivery-mobile-form__textarea"
        />
      </div>
      <hr>
      <UIButton
        type="submit"
        :disabled="isButtonDisabled"
        color="yellow"
        class="modal-receipt-delivery-mobile-form__button"
      >
        Подтвердить
      </UIButton>
    </form>
  </CommonBottomSheet>
</template>

<script setup>
import { useCommonStore } from '@/store/common'
import { useUserStore } from '@/store/user'

const commonStore = useCommonStore()
const userStore = useUserStore()

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

const emits = defineEmits(['close', 'setDeliveryCoords'])

const form = reactive({
  address: '',
  flat: '',
  entrance: '',
  floor: '',
  number: '',
  comment: '',
  coords: null,
})
const results = ref([])
const isShowResults = ref(false)

watch(() => props.deliveryCoords, (data) => {
  if (data) {
    searchByCoords(data)
  }
})

// <!-- Computed -->
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

// const submit = () => {
//   userStore.setDeliveryForm(form)

//   const obj = {
//     address: form.address,
//     name: '',
//     warehouse_id: condition.value.warehouse_id
//   }

//   if (useChangeLocation('delivery', obj)) {
//     emits('close')
//   }
// }

const setDefault = () => {
  if (userStore.deliveryForm) {
    for (const key in userStore.deliveryForm) {
      form[key] = userStore.deliveryForm[key]
    }

    ymaps.ready(() => {
      setTimeout(() => {
        emits('setDeliveryCoords', form.coords)
      }, 1000)
    })
  }
}

const onSubmit = () => {
  userStore.setDeliveryForm(form)

  const obj = {
    address: form.address,
    name: '',
    warehouse_id: condition.value.warehouse_id
  }

  if (useChangeLocation('delivery', obj)) {
    emits('close')
  }
}

setDefault()
</script>

<style lang="scss" scoped>
.modal-receipt-delivery-mobile-form {
  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  font-weight: 500;

  hr {
    margin: 0 -20px;
    border-color: $grayBg;
  }

  &__label {
    @include text_small;
    font-weight: 500;
    color: $grayText;
  }

  &__line {
    &--cols  {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 8px;
    }

    ::v-deep input, ::v-deep textarea {
      @include text_mini;

      @include mq($bp-super-small) {
        @include text_normal;
      }
    }
  }

  &__textarea {
    ::v-deep textarea {
      height: 80px;
    }
  }

  &__button {
    font-weight: 500;
  }
}

.modal-receipt-delivery-mobile-form-input {
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

    &--opened {
      border-radius: 14px 14px 0 0;
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

.modal-receipt-delivery-mobile-form-results {
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;

  max-height: 250px;

  display: flex;
  flex-direction: column;
  grid-gap: 5px;

  background: $grayBg;
  border-radius: 0 0 14px 14px;

  overflow-y: auto;
  overflow-x: hidden;

  &__item {
    padding: 10px 16px;

    white-space: nowrap;
    cursor: pointer;

    @include text_mini;
    font-weight: 500;

    @include mq($bp-super-small) {
      @include text_normal;
    }

    &:hover {
      background: $grayText;
    }
  }
}
</style>