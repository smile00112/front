<template>
  <div
    id="yandex-map"
  />
    <!-- <yandex-map-marker
      v-for="item in markers"
      :key="item.id"
      :settings="{
        coordinates: item.coordinates,
        id: item.id,
        onClick: () => {emits('update', item)},
      }"
    >
      <div
        class="modal-receipt-map-marker"
      >
        <UIIcon
          name="metka"
          class="modal-receipt-map-marker__icon"
        />

        <div
          v-if="currentMarker?.id === item.id"
          class="modal-receipt-map-popup"
        >
          <p class="modal-receipt-map-popup__title">
            {{ item.name }}
          </p>
          <p class="modal-receipt-map-popup__address">
            {{ item.address }}
          </p>
          <p class="modal-receipt-map-popup__time">
            <UIIcon
              name="clock-filled"
              class="modal-receipt-map-popup__icon"
            />
            <span v-html="item.working_time" />
          </p>
        </div>
      </div>
    </yandex-map-marker> -->
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import trimStr from '@/utils/trimStr'

const commonStore = useCommonStore()
const { pickupLocations } = storeToRefs(commonStore)

const props = defineProps({
  deliveryType: {
    type: String,
    default: 'delivery',
  },

  currentAddress: {
    type: undefined,
    default: null,
  },

  deliveryCoords: {
    type: Array,
    default: null,
  },
})

const emits = defineEmits(['update', 'setDeliveryCoords', 'setDeliveryZone'])

const map = shallowRef(null)
const collection = shallowRef(null)
// const mapCenter = [61.402554, 55.159902]
const mapZoom = 12

const deliveryMarker = shallowRef(null)
const currentMarker = ref(null)

// Watch
watch(() => props.deliveryType, () => {
  setMarkers()
})

watch(() => props.currentAddress, (data) => {
  if (data) {
    goToMarker(data)
  } else {
    setCenter('pickup')
  }
})

watch(() => props.deliveryCoords, (data) => {
  if (data) {
    deliveryMarker.value.geometry.setCoordinates(data)

    map.value.setCenter(
      data,
      17,
      {
        duration: 1000
      }
    )
    
    collection.value.each(item => {
      if (item.geometry.contains(data)) {
        const zone = item.options.get('iconImageHref')
        emits('setDeliveryZone', zone)
      }
    })
  }
})

// Computed
const mapCenter = computed(() => commonStore.mapCenter)
const zones = computed(() => commonStore.zones)

// <!-- Methods -->
const onMapClick = (e, zone) => {
  if (props.deliveryType === 'delivery') {
    const coords = e.get('coords')

    deliveryMarker.value.geometry.setCoordinates(coords)

    emits('setDeliveryCoords', coords)
    emits('setDeliveryZone', zone)
  }
}

const goToMarker = (item) => {
  map.value.setCenter(
    item.coordinates,
    17,
    {
      duration: 400
    }
  )
}

const setMarkers = () => {
  map.value.geoObjects.removeAll()

  if (props.deliveryType === 'delivery') {
    collection.value = new ymaps.GeoObjectCollection({})

    zones.value.forEach(item => {
      const polygon = new ymaps.GeoObject({
        geometry: item.geometry,
      }, {
        ...item.options,
        iconImageHref: item.zone
      })

      polygon.events.add(['click'], (e) => {
        const zone = item.zone

        onMapClick(e, zone)
      })

      collection.value.add(polygon)
    })
    map.value.geoObjects.add(collection.value)


    deliveryMarker.value = new ymaps.Placemark(
      mapCenter.value, {}, {
        iconLayout: 'default#image',
        iconImageHref: '/images/marker-delivery.svg',
        iconImageSize: [50, 50],
        iconImageOffset: [-25, -45]
      }
    )
    map.value.geoObjects.add(deliveryMarker.value)

    setCenter('delivery')
  } else if (props.deliveryType === 'pickup' || props.deliveryType === 'lounge') {
    pickupLocations.value(props.deliveryType).forEach(item => {
      const placemark = new ymaps.Placemark(
        item.coordinates, {}, {
          iconLayout: 'default#image',
          iconImageHref: '/images/marker-pickup.svg',
          iconImageSize: [50, 50],
          iconImageOffset: [-25, -45]
        }
      )
      placemark.events.add(['click'], () => {
        emits('update', item)
      })
      map.value.geoObjects.add(placemark)
    })

    setCenter('pickup')
  }
}

const setCenter = (type) => {
  if (type === 'pickup') {
    map.value.setBounds(map.value.geoObjects.getBounds(), {
      checkZoomRange: true,
      // duration: 1000,
    })
  } else if (type === 'delivery') {
    map.value.setCenter(
      mapCenter.value,
      mapZoom,
    )
  }
}

const ymapsInit = () => {
  ymaps.ready(() => {
    map.value = new ymaps.Map('yandex-map', {
      center: mapCenter.value,
      zoom: mapZoom,
      controls: ['zoomControl'],
    })

    map.value.events.add(['click'], (e) => {
      const zone = null

      onMapClick(e, zone)
    })

    setMarkers()
  })
}

ymapsInit()
</script>

<style lang="scss" scoped>
.modal-receipt-map {
  width: 100%;
  height: 100%;

  border-radius: 0 40px 40px 0;
  overflow: hidden;
}

// .modal-receipt-map-marker {
//   position: relative;

//   transform: translate(-50%, calc(-50% - 25px));

//   &--delivery {
//     .modal-receipt-map-marker {
//       &__icon {
//         ::v-deep svg {
//           path {
//             fill: $blackText;
//           }
//         }
//       }
//     }
//   }

//   &__icon {
//     ::v-deep svg {
//       width: 50px;
//       height: 50px;

//       path {
//         fill: $orange;
//       }
//     }
//   }
// }

.modal-receipt-map-popup {
  position: absolute;

  left: 0;
  top: calc(100% + 8px);

  width: 260px;

  display: grid;
  grid-gap: 6px;

  padding: 10px 25px;

  background: $white;
  border-radius: 20px;

  &__title {
    @include overflow-text;
    @include text_normal;
    font-weight: 600;
    color: $black;
  }

  &__address {
    @include overflow-text;
    @include text_small;
    font-weight: 500;
    color: $grayText;
  }

  &__time {
    display: flex;
    align-items: center;
    grid-gap: 5px;

    @include text_mini;
    color: $grayText;
  }
}
</style>