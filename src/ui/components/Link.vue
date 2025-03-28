<script lang="ts">
import theme from '@/ui/theme/link'
import { Primitive } from 'reka-ui'
import { tv } from 'tailwind-variants'
import { computed } from 'vue'

const link = tv(theme)

export interface LinkProps {
  as?: string
  type?: string
  active?: boolean
  disabled?: boolean
  href?: string
  target?: string
  rel?: string
  class?: any
  raw?: boolean
  onClick?: ((e: MouseEvent) => void | Promise<void>) | Array<((e: MouseEvent) => void | Promise<void>)>
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<LinkProps>(), {
  as: 'button',
  type: 'button',
})

const ui = computed(() => link({
  active: props.active,
  disabled: props.disabled,
  class: props.class,
}))

const resolvedClass = computed(() => {
  if (props.raw)
    return props.class

  return ui.value
})

function onClickWrapper(e: MouseEvent) {
  if (props.disabled) {
    e.stopPropagation()
    e.preventDefault()
    return
  }

  if (props.onClick) {
    for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
      onClick(e)
    }
  }
}
</script>

<template>
  <Primitive
    v-bind="href ? {
      'as': 'a',
      'href': disabled ? undefined : href,
      'aria-disabled': disabled ? 'true' : undefined,
      'role': disabled ? 'link' : undefined,
      'tabindex': disabled ? -1 : undefined,
    } : as === 'button' ? {
      as,
      type,
      disabled,
    } : {
      as,
    }"
    :rel="rel"
    :target="target"
    :class="resolvedClass"
    @click="onClickWrapper"
  >
    <slot />
  </Primitive>
</template>
