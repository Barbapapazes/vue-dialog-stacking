import type { AvatarGroupProps } from '@/ui/components/AvatarGroup.vue'
import { avatarGroupInjectionKey } from '@/ui/keys/avatar-group'
import { computed, inject } from 'vue'

export function useAvatarGroup(props: { size: AvatarGroupProps['size'] }) {
  const avatarGroup = inject(avatarGroupInjectionKey, undefined)
  const size = computed(() => props.size ?? avatarGroup?.value.size)

  return {
    size,
  }
}
