import type { AvatarGroupProps } from '@/ui/components/AvatarGroup.vue'
import type { ComputedRef, InjectionKey } from 'vue'

export const avatarGroupInjectionKey: InjectionKey<ComputedRef<{ size: AvatarGroupProps['size'] }>> = Symbol('vue-ui.avatar-group')
