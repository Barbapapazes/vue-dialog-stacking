import type { GetObjectField } from '@/ui/types/utils'
import { buttonGroupInjectionKey } from '@/ui/keys/button-group'
import { computed, inject } from 'vue'

interface Props<T> {
  size?: GetObjectField<T, 'size'>
}

export function useButtonGroup<T>(props: Props<T>) {
  const buttonGroup = inject(buttonGroupInjectionKey, undefined)
  return {
    orientation: computed(() => buttonGroup?.value.orientation),
    size: computed(() => props?.size ?? buttonGroup?.value.size),
  }
}
