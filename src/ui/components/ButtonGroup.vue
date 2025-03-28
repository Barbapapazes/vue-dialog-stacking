<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import { buttonGroupInjectionKey } from '@/ui/keys/button-group'
import theme from '@/ui/theme/button-group'
import { Primitive } from 'reka-ui'
import { tv } from 'tailwind-variants'
import { computed, provide } from 'vue'

const buttonGroup = tv(theme)

type ButtonGroupVariants = VariantProps<typeof buttonGroup>

export interface ButtonGroupProps {
  as?: any
  size?: ButtonGroupVariants['size']
  orientation?: ButtonGroupVariants['orientation']
  class?: any
}

export interface ButtonGroupSlots {
  default: (props?: object) => any
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
})
defineSlots<ButtonGroupSlots>()

provide(buttonGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  size: props.size,
})))
</script>

<template>
  <Primitive :as="as" :class="buttonGroup({ orientation, class: props.class })">
    <slot />
  </Primitive>
</template>
