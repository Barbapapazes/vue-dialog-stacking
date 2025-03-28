<script lang="ts">
const secondModal = tv({
 slots: {
  base: ''
 },
})

export interface SecondModalProps {
  title: string
  description: string
  class?: any
  ui?: Partial<typeof secondModal.slots>
}
export interface SecondModalEmits {}
export interface SecondModalSlots {}
</script>

<script lang="ts" setup>
const props = defineProps<SecondModalProps>()
defineEmits<SecondModalEmits>()
defineSlots<SecondModalSlots>()

const ui = computed(() => secondModal())
</script>

<template>
  <Modal
    :title="props.title"
    :description="props.description"
    :class="ui.base({ class: [props.class, props.ui?.base] })"
  />
</template>
