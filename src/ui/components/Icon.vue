<script lang="ts">
import theme from '@/ui/theme/icon'
import { Primitive } from 'reka-ui'
import { tv } from 'tailwind-variants'
import { computed } from 'vue'

const icon = tv(theme)

export interface IconProps {
  as?: any
  name?: string
  class?: any
}

export interface IconEmits {}
export interface IconSlots {}
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<IconProps>(), {
  as: 'span',
})
defineEmits<IconEmits>()
defineSlots<IconSlots>()

const ui = computed(() => icon({
  class: [props.name, props.class],
}))
</script>

<template>
  <Primitive :as="as" :class="ui" />
</template>
