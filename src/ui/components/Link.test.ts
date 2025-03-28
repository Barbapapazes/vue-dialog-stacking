import type { RenderOptions } from '@testing-library/vue'
import Link from '@/ui/components/Link.vue'
import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

describe('link', () => {
  it.each<[string, RenderOptions<typeof Link>]>([
    // Props
    ['with as', { props: { as: 'div' } }],
    ['with to', { props: { href: '/' } }],
    ['with type', { props: { type: 'submit' as const } }],
    ['with disabled', { props: { disabled: true } }],
    ['with raw', { props: { raw: true } }],
    ['with class', { props: { class: 'font-medium' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ])('renders %s correctly', (name, options) => {
    render(Link, {
      attrs: {
        'data-testid': 'link',
      },
      ...options,
    })

    expect(screen.getByTestId('link')).matchSnapshot()
  })
})
