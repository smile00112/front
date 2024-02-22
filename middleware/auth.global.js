import { useUserStore } from '@/store/user'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  if (!userStore.isAuth && to.path.includes('/lk')) {
    return navigateTo('/')
  }
})
