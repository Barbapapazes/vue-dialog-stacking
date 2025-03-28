<script lang="ts">

</script>

<script setup lang="ts">
import type { Overlay } from '@/ui/composables/useOverlay'
import { useOverlay } from '@/ui/composables/useOverlay'
import { computed } from 'vue'

const { overlays, unMount, close } = useOverlay()

const mountedOverlays = computed(() => overlays.filter((overlay: Overlay) => overlay.isMounted))

function onAfterLeave(id: symbol) {
  close(id)
  unMount(id)
}

function onClose(id: symbol, value: any) {
  close(id, value)
}
</script>

<template>
  <component
    :is="overlay.component"
    v-for="(overlay, index) in mountedOverlays"
    :key="overlay.id"
    v-bind="overlay.props"
    v-model:open="overlay.modelValue"
    class="origin-top transition-transform duration-200 ease-in-out"
    :content="{
      style: `scale: calc(100% - ${4 * (mountedOverlays.length - index - 1)}%; transform: translateY(-${1.25 * (mountedOverlays.length - index - 1)}rem);`,
    }"
    @close="(value:any) => onClose(overlay.id, value)"
    @after:leave="onAfterLeave(overlay.id)"
  />
</template>
