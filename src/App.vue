<script lang="ts" setup>
import FirstModal from './components/FirstModal.vue';

const overlay = useOverlay()
function openOverlay() {
  overlay
    .create(FirstModal, {
      props: {
        title: 'First Modal',
        description: 'This is the first modal'
      },
      destroyOnClose: true
    })
    .open()
}
</script>

<template>
  <div class="p-4 flex flex-col items-center gap-4">
    <h1 class="font-semibold">Vue Dialog Stacking</h1>

    <Button label="Open First Overlay" @click="openOverlay" />

    <OverlayProvider />
  </div>
</template>
