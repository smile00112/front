import { useCartStore } from '@/store/cart'
import { useCommonStore } from '@/store/common'

export const useChangeLocation = (type, location) => {
  const cartStore = useCartStore()
  const commonStore = useCommonStore()

  const { missedProductsList } = storeToRefs(cartStore)

  const warehouseId = location.warehouse_id

  if (missedProductsList.value(warehouseId).length) {
    commonStore.setMissedProductsModal({
      type,
      location
    })
    return false
  }

  commonStore.setDeliveryType(type)
  commonStore.setLocation(location)

  return true
}