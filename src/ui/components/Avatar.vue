<script lang="ts">
import type { AvatarFallbackProps } from 'reka-ui'
import type { VariantProps } from 'tailwind-variants'
import Icon from '@/ui/components/Icon.vue'
import { useAvatarGroup } from '@/ui/composables/useAvatarGroup'
import theme from '@/ui/theme/avatar'
import { reactivePick } from '@vueuse/core'
import { AvatarFallback, AvatarImage, AvatarRoot, useForwardProps } from 'reka-ui'
import { tv } from 'tailwind-variants'
import { computed } from 'vue'

const avatar = tv(theme)

type AvatarVariants = VariantProps<typeof avatar>

export interface AvatarProps extends Pick<AvatarFallbackProps, 'delayMs'> {
  as?: any
  src?: string
  alt?: string
  icon?: string
  text?: string
  size?: AvatarVariants['size']
  class?: any
  ui?: Partial<typeof avatar.slots>
}

export interface AvatarSlots {
  default: (props?: object) => any
}
</script>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<AvatarProps>(), { as: 'span' })
defineSlots<AvatarSlots>()

const fallbackProps = useForwardProps(reactivePick(props, 'delayMs'))

const fallback = computed(() => props.text || (props.alt || '').split(' ').map(word => word.charAt(0)).join('').substring(0, 2))

const { size } = useAvatarGroup(props)

const ui = computed(() => avatar({
  size: size.value,
}))
</script>

<template>
  <AvatarRoot :as="as" :class="ui.root({ class: [props.class, props.ui?.root] })">
    <AvatarImage
      v-if="src"
      as="img"
      :src="src"
      :alt="alt"
      v-bind="$attrs"
      :class="ui.image({ class: props.ui?.image })"
    />
    <AvatarFallback as-child v-bind="fallbackProps">
      <slot>
        <Icon v-if="icon" :name="icon" :class="ui.icon({ class: props.ui?.icon })" />
        <span v-else :class="ui.fallback({ class: props.ui?.fallback })">{{ fallback }}</span>
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
