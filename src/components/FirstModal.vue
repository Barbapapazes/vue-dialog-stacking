<script lang="ts">
import SecondModal from './SecondModal.vue';

const firstModal = tv({
 slots: {
  base: ''
 },
})

export interface FirstModalProps {
  title: string
  description: string
  class?: any
  ui?: Partial<typeof firstModal.slots>
}
export interface FirstModalEmits {}
export interface FirstModalSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<FirstModalProps>()
defineEmits<FirstModalEmits>()
defineSlots<FirstModalSlots>()

const overlay = useOverlay()
function openOverlay() {
  overlay
    .create(SecondModal, {
      props: {
        title: 'Second Modal',
        description: 'This is the second modal'
      },
      destroyOnClose: true
    })
    .open()
}

const ui = computed(() => firstModal())
</script>

<template>
  <Modal
    :title="props.title"
    :description="props.description"
    :class="ui.base({ class: [props.class, props.ui?.base] })"
    :ui="{ body: 'flex justify-center items-end' }"
  >
    <template #body>
      <Button
        label="Open Second Modal"
        @click="openOverlay"
      />
    </template>
  </Modal>
</template>
