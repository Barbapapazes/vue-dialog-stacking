<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import Avatar from '@/ui/components/Avatar.vue'
import { avatarGroupInjectionKey } from '@/ui/keys/avatar-group'
import theme from '@/ui/theme/avatar-group'
import { Primitive } from 'reka-ui'
import { tv } from 'tailwind-variants'
import { computed, provide } from 'vue'

const avatarGroup = tv(theme)

type AvatarGroupVariants = VariantProps<typeof avatarGroup>

export interface AvatarGroupProps {
  as?: any
  size?: AvatarGroupVariants['size']
  max?: number | string
  class?: any
  ui?: Partial<typeof avatarGroup.slots>
}

export interface AvatarGroupSlots {
  default: (props?: object) => any
}
</script>

<script setup lang="ts">
const props = defineProps<AvatarGroupProps>()
const slots = defineSlots<AvatarGroupSlots>()

const ui = computed(() => avatarGroup({
  size: props.size,
}))

const max = computed(() => typeof props.max === 'string' ? Number.parseInt(props.max, 10) : props.max)

const children = computed(() => {
  let children = slots.default?.()
  if (children?.length) {
    children = children.flatMap((child: any) => {
      if (typeof child.type === 'symbol') {
        // `v-if="false"` or commented node
        if (typeof child.children === 'string') {
          return null
        }

        return child.children
      }

      return child
    }).filter(Boolean)
  }

  return children || []
})

const visibleAvatars = computed(() => {
  if (!children.value.length) {
    return []
  }

  if (!max.value || max.value <= 0) {
    return [...children.value].reverse()
  }

  return [...children.value].slice(0, max.value).reverse()
})

const hiddenCount = computed(() => {
  if (!children.value.length) {
    return 0
  }

  return children.value.length - visibleAvatars.value.length
})

provide(avatarGroupInjectionKey, computed(() => ({
  size: props.size,
})))
</script>

<template>
  <Primitive :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <Avatar v-if="hiddenCount > 0" :text="`+${hiddenCount}`" :class="ui.base({ class: props.ui?.base })" />
    <component :is="avatar" v-for="(avatar, count) in visibleAvatars" :key="count" :class="ui.base({ class: props.ui?.base })" />
  </Primitive>
</template>
