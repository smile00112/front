<template>
  <NuxtLink
    to="/"
    class="logo"
  >
    <!-- <UIIcon :name="isSmall ? 'logo-small' : 'logo'" /> -->
    <img
      :src="logo"
      alt=""
    >
  </NuxtLink>
</template>

<script setup>
defineProps({
  isSmall: {
    type: Boolean,
    default: false
  }
})

const logo = ref(null)

const getLogo = async () => {
  const { data } = await useFetch('/api/wp-json/v1/logo')

  if (data?.value) {
    logo.value = data?.value?.gr_logo_header_desktop?.logo_header_desktop || ''
  }
}

getLogo()
</script>

<style lang="scss" scoped>
.logo {
  width: 153px;
  height: 36px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>