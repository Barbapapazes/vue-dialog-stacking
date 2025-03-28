import type { LinkProps } from '@/ui/components/Link.vue'
import { reactivePick } from '@vueuse/shared'

export function pickLinkProps(link: LinkProps & { ariaLabel?: string, title?: string }) {
  return reactivePick(link, 'active', 'ariaLabel', 'as', 'disabled', 'href', 'rel', 'target', 'type', 'title', 'onClick')
}
