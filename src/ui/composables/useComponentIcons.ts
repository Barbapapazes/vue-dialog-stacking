import type { AvatarProps } from '@/ui/components/Avatar.vue'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

export interface UseComponentIconsProps {
  icon?: string
  avatar?: AvatarProps
  leading?: boolean
  leadingIcon?: string
  trailing?: boolean
  trailingIcon?: string
  loading?: boolean
}

export function useComponentIcons(componentProps: MaybeRefOrGetter<UseComponentIconsProps>) {
  const props = computed(() => toValue(componentProps))

  const isLeading = computed(() => (props.value.icon && props.value.leading) || (props.value.icon && !props.value.trailing) || (props.value.loading && !props.value.trailing) || !!props.value.leadingIcon)
  const isTrailing = computed(() => (props.value.icon && props.value.trailing) || (props.value.loading && props.value.trailing) || !!props.value.trailingIcon)

  const leadingIconName = computed(() => {
    if (props.value.loading) {
      return ''
    }

    return props.value.leadingIcon || props.value.icon
  })
  const trailingIconName = computed(() => {
    if (props.value.loading && !isLeading.value) {
      return ''
    }

    return props.value.trailingIcon || props.value.icon
  })

  return {
    isLeading,
    isTrailing,
    leadingIconName,
    trailingIconName,
  }
}
