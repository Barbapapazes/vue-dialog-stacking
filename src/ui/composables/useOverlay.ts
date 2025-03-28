import type { Component } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { createSharedComposable } from '@vueuse/core'
import { markRaw, reactive, shallowReactive } from 'vue'

export interface OverlayOptions<OverlayAttrs = Record<string, any>> {
  defaultOpen?: boolean
  props?: OverlayAttrs
  destroyOnClose?: boolean
}

interface ManagedOverlayOptionsPrivate<T extends Component> {
  component?: T
  id: symbol
  isMounted: boolean
  modelValue: boolean
  resolvePromise?: (value: unknown) => void
}
export type Overlay = OverlayOptions<Component> & ManagedOverlayOptionsPrivate<Component>

interface OverlayInstance<T> {
  open: (props?: ComponentProps<T>) => Promise<any>
  close: (value?: any) => void
  patch: (props: Partial<ComponentProps<T>>) => void
}

function _useOverlay() {
  const overlays = shallowReactive<Overlay[]>([])

  const getOverlay = (id: symbol): Overlay => {
    const overlay = overlays.find(overlay => overlay.id === id)

    if (!overlay) {
      throw new Error('Overlay not found')
    }

    return overlay
  }

  const patch = <T extends Component>(id: symbol, props: Partial<ComponentProps<T>>): void => {
    const overlay = getOverlay(id)

    Object.entries(props!).forEach(([key, value]) => {
      (overlay.props as any)[key] = value
    })
  }

  const open = <T extends Component>(id: symbol, props?: ComponentProps<T>): Promise<any> => {
    const overlay = getOverlay(id)

    // If props are provided, update the overlay's props
    if (props) {
      patch(overlay.id, props)
    }

    overlay.modelValue = true
    overlay.isMounted = true

    // Return a new promise that will be resolved when close is called
    return new Promise((resolve) => {
      overlay.resolvePromise = resolve
    })
  }

  const close = (id: symbol, value?: any): void => {
    const overlay = getOverlay(id)

    overlay.modelValue = false

    // Resolve the promise if it exists
    if (overlay.resolvePromise) {
      overlay.resolvePromise(value)
      overlay.resolvePromise = undefined
    }
  }

  const unMount = (id: symbol): void => {
    const overlay = getOverlay(id)

    overlay.isMounted = false

    if (overlay.destroyOnClose) {
      const index = overlays.findIndex(overlay => overlay.id === id)
      overlays.splice(index, 1)
    }
  }

  const create = <T extends Component>(component: T, _options?: OverlayOptions<ComponentProps<T>>): OverlayInstance<T> => {
    const { props, defaultOpen, destroyOnClose } = _options || {}

    const options = reactive<Overlay>({
      id: Symbol(import.meta.dev ? 'useOverlay' : ''),
      modelValue: !!defaultOpen,
      component: markRaw(component!),
      isMounted: !!defaultOpen,
      destroyOnClose: !!destroyOnClose,
      props: props || {},
    })

    overlays.push(options)

    return {
      open: <T extends Component>(props?: ComponentProps<T>) => open(options.id, props),
      close: value => close(options.id, value),
      patch: <T extends Component>(props: Partial<ComponentProps<T>>) => patch(options.id, props),
    }
  }

  return {
    overlays,
    open,
    close,
    patch,
    unMount,

    create,
  }
}

export const useOverlay = createSharedComposable(_useOverlay)
