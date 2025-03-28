import type { ButtonGroupProps } from '@/ui/components/ButtonGroup.vue'
import type { ComputedRef, InjectionKey } from 'vue'

export const buttonGroupInjectionKey: InjectionKey<ComputedRef<{
  size: ButtonGroupProps['size']
  orientation: ButtonGroupProps['orientation']
}>> = Symbol('vue-ui.button-group')
