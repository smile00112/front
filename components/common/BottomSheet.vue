<template>
  <div
    :class="[
      'bottom-sheet',
      {
        'bottom-sheet--fullscreen' : sheetHeight === 100,
        'bottom-sheet--draggable': isDraggable,
        'bottom-sheet--autoheight' : autoHeight,
      }
    ]"
    :style="autoHeight ? '' : sheetHeight === 100 ? '' : `height: ${sheetHeight}vh`"
  >
    <button
      ref="draggableButton"
      type="button"
      class="bottom-sheet__button"
    >
      <UIIcon name="bottom-sheet" />
    </button>

    <div class="bottom-sheet__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
const START_HEIGHT = 15

defineProps({
  autoHeight: {
    type: Boolean,
    default: false,
  },
})

const draggableButton = ref(null)
const dragPosition = ref(null)
const sheetHeight = ref(START_HEIGHT)
const isFullscreen = ref(false)
const isDraggable = ref(false)

// <!-- Methods -->
const setSheetHeight = (value) => {
  sheetHeight.value = Math.max(0, Math.min(100, value))
}

const touchPosition = (event) => {
  return event.touches ? event.touches[0] : event
}

const onDragStart = (e) => {
  dragPosition.value = touchPosition(e).pageY
  isDraggable.value = true
}

const onDragMove = (e) => {
  if (dragPosition.value === null) {
    return
  }
  const y = touchPosition(e).pageY
  const deltaY = dragPosition.value - y
  const deltaHeight = deltaY / window.innerHeight * 100
  setSheetHeight(sheetHeight.value + deltaHeight)
  dragPosition.value = y
}

const onDragEnd = () => {
  dragPosition.value = null
  isDraggable.value = false

  if (isFullscreen.value && sheetHeight.value < 90) {
    isFullscreen.value = false
    setSheetHeight(START_HEIGHT)
    return
  }

  if (sheetHeight.value > 25) {
    setSheetHeight(100)
    isFullscreen.value = true
  } else {
    isFullscreen.value = false
    setSheetHeight(START_HEIGHT)
  }
}

onMounted(() => {
  draggableButton.value.addEventListener('mousedown', onDragStart)
  draggableButton.value.addEventListener('touchstart', onDragStart)
  window.addEventListener('mousemove', onDragMove)
  window.addEventListener('touchmove', onDragMove)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchend', onDragEnd)
})
</script>

<style lang="scss" scoped>
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;

  max-height: calc(100vh - 20px);
  height: 15vh;

  background: $white;
  border-radius: 40px 40px 0 0;
  box-shadow: 0px -2px 80px 0px rgba(0, 0, 0, 0.20);
  overflow: hidden;
  transition: height 0.3s;

  &--draggable {
    transition: height 0s;
  }

  &--fullscreen {
    height: 100vh;
    height: calc(var(--app-height) - 20px);

    .bottom-sheet {
      &__content {
        overflow-y: auto;
      }
    }
  }

  &--autoheight {
    height: auto;

    .bottom-sheet__button {
      display: none;
    }
  }

  &__button {
    flex: 0 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 50px;

    padding-top: 20px;
    padding-bottom: 20px;    
  }

  &__content {
    padding: 0 20px 20px 20px;
  }
}
</style>