<script lang="ts">
import type { ButtonProps } from '@/ui/components/Button.vue'
import type { DialogContentEmits, DialogContentProps, DialogRootEmits, DialogRootProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import Button from '@/ui/components/Button.vue'
import { close as closeIcon } from '@/ui/icons'
import theme from '@/ui/theme/modal'
import { reactivePick } from '@vueuse/shared'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, useForwardPropsEmits, VisuallyHidden } from 'reka-ui'
import { tv } from 'tailwind-variants'
import { computed, toRef } from 'vue'

const modal = tv(theme)

export interface ModalProps extends DialogRootProps {
  title?: string
  description?: string
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DialogContentEmits>>
  overlay?: boolean
  transition?: boolean
  fullscreen?: boolean
  portal?: boolean
  close?: boolean | Partial<ButtonProps>
  closeIcon?: string
  dismissible?: boolean
  class?: any
  ui?: Partial<typeof modal.slots>
}

export interface ModalEmits extends DialogRootEmits {
  'after:leave': []
}

export interface ModalSlots {
  default: (props: { open: boolean }) => any
  content: (props?: object) => any
  header: (props?: object) => any
  title: (props?: object) => any
  description: (props?: object) => any
  close: (props: { ui: ReturnType<typeof modal> }) => any
  body: (props?: object) => any
  footer: (props?: object) => any
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ModalProps>(), {
  close: true,
  portal: true,
  overlay: true,
  transition: true,
  modal: true,
  dismissible: true,
})
const emits = defineEmits<ModalEmits>()
const slots = defineSlots<ModalSlots>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'open', 'defaultOpen', 'modal'), emits)
const contentProps = toRef(() => props.content)
const contentEvents = computed(() => {
  const events = {
    closeAutoFocus: (e: Event) => e.preventDefault(),
  }

  if (!props.dismissible) {
    return {
      pointerDownOutside: (e: Event) => e.preventDefault(),
      interactOutside: (e: Event) => e.preventDefault(),
      escapeKeyDown: (e: Event) => e.preventDefault(),
      ...events,
    }
  }

  return events
})

const ui = computed(() => modal({
  transition: props.transition,
  fullscreen: props.fullscreen,
}))
</script>

<!-- eslint-disable vue/custom-event-name-casing -->
<template>
  <DialogRoot v-slot="{ open }" v-bind="rootProps">
    <DialogTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal :disabled="!portal">
      <DialogOverlay v-if="overlay" :class="ui.overlay({ class: props.ui?.overlay })" />

      <DialogContent :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })" v-bind="contentProps" @after-leave="emits('after:leave')" v-on="contentEvents">
        <VisuallyHidden v-if="!!slots.content && ((title || !!slots.title) || (description || !!slots.description))">
          <DialogTitle v-if="title || !!slots.title">
            <slot name="title">
              {{ title }}
            </slot>
          </DialogTitle>

          <DialogDescription v-if="description || !!slots.description">
            <slot name="description">
              {{ description }}
            </slot>
          </DialogDescription>
        </VisuallyHidden>

        <slot name="content">
          <div v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description) || (close || !!slots.close)" :class="ui.header({ class: props.ui?.header })">
            <slot name="header">
              <div :class="ui.wrapper({ class: props.ui?.wrapper })">
                <DialogTitle v-if="title || !!slots.title" :class="ui.title({ class: props.ui?.title })">
                  <slot name="title">
                    {{ title }}
                  </slot>
                </DialogTitle>

                <DialogDescription v-if="description || !!slots.description" :class="ui.description({ class: props.ui?.description })">
                  <slot name="description">
                    {{ description }}
                  </slot>
                </DialogDescription>
              </div>

              <DialogClose v-if="close || !!slots.close" as-child>
                <slot name="close" :ui="ui">
                  <Button
                    v-if="close"
                    :icon="closeIcon"
                    size="md"
                    color="neutral"
                    variant="ghost"
                    aria-label="close"
                    v-bind="(typeof close === 'object' ? close as Partial<ButtonProps> : {})"
                    :class="ui.close({ class: props.ui?.close })"
                  />
                </slot>
              </DialogClose>
            </slot>
          </div>

          <div v-if="!!slots.body" :class="ui.body({ class: props.ui?.body })">
            <slot name="body" />
          </div>

          <div v-if="!!slots.footer" :class="ui.footer({ class: props.ui?.footer })">
            <slot name="footer" />
          </div>
        </slot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
