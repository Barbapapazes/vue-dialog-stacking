import { buttonGroupVariant } from '@/ui/theme/button-group'

export default {
  slots: {
    base: 'relative rounded-[calc(var(--ui-radius)*1.5)] font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors',
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0',
    loadingIcon: 'absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2',
  },
  variants: {
    ...buttonGroupVariant,
    color: {
      primary: '',
      secondary: '',
      success: '',
      info: '',
      warning: '',
      error: '',
      neutral: '',
    },
    variant: {
      solid: '',
      outline: '',
      soft: '',
      subtle: '',
      ghost: '',
      link: '',
    },
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
        loadingIcon: 'size-4',
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4',
        ladingIcon: 'size-4',
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
        loadingIcon: 'size-5',
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-5',
        loadingIcon: 'size-5',
      },
      xl: {
        base: 'px-3 py-2 text-base gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-6',
        loadingIcon: 'size-6',
      },
    },
    block: {
      true: {
        base: 'w-full justify-center',
        leadingAvatarSize: 'xs',
        trailingIcon: 'ms-auto',
      },
    },
    square: {
      true: '',
    },
    leading: {
      true: '',
    },
    trailing: {
      true: '',
    },
    loading: {
      true: {
        leadingIcon: 'opacity-0',
        label: 'opacity-0',
        trailingIcon: 'opacity-0',
        loadingIcon: 'animate-spin',
      },
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'solid',
      class: `text-(--ui-bg) bg-(--ui-primary) hover:bg-(--ui-primary)/75 disabled:bg-(--ui-primary) aria-disabled:bg-(--ui-primary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)`,
    } as const,
    {
      color: 'primary',
      variant: 'outline',
      class: `ring ring-inset ring-(--ui-primary)/50 text-(--ui-primary) hover:bg-(--ui-primary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-primary)`,
    } as const,
    {
      color: 'primary',
      variant: 'soft',
      class: `text-(--ui-primary) bg-(--ui-primary)/10 hover:bg-(--ui-primary)/15 focus-visible:bg-(--ui-primary)/15 disabled:bg-(--ui-primary)/10 aria-disabled:bg-(--ui-primary)/10`,
    } as const,
    {
      color: 'primary',
      variant: 'subtle',
      class: `text-(--ui-primary) ring ring-inset ring-(--ui-primary)/25 bg-(--ui-primary)/10 hover:bg-(--ui-primary)/15 disabled:bg-(--ui-primary)/10 aria-disabled:bg-(--ui-primary)/10 focus-visible:ring-2 focus-visible:ring-(--ui-primary)`,
    } as const,
    {
      color: 'primary',
      variant: 'ghost',
      class: `text-(--ui-primary) hover:bg-(--ui-primary)/10 focus-visible:bg-(--ui-primary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent`,
    } as const,
    {
      color: 'primary',
      variant: 'link',
      class: `text-(--ui-primary) hover:text-(--ui-primary)/75 disabled:text-(--ui-primary) aria-disabled:text-(--ui-primary) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-primary)`,
    } as const,
    {
      color: 'secondary',
      variant: 'solid',
      class: `text-(--ui-bg) bg-(--ui-secondary) hover:bg-(--ui-secondary)/75 disabled:bg-(--ui-secondary) aria-disabled:bg-(--ui-secondary) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-secondary)`,
    } as const,
    {
      color: 'secondary',
      variant: 'outline',
      class: `ring ring-inset ring-(--ui-secondary)/50 text-(--ui-secondary) hover:bg-(--ui-secondary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-secondary)`,
    } as const,
    {
      color: 'secondary',
      variant: 'soft',
      class: `text-(--ui-secondary) bg-(--ui-secondary)/10 hover:bg-(--ui-secondary)/15 focus-visible:bg-(--ui-secondary)/15 disabled:bg-(--ui-secondary)/10 aria-disabled:bg-(--ui-secondary)/10`,
    } as const,
    {
      color: 'secondary',
      variant: 'subtle',
      class: `text-(--ui-secondary) ring ring-inset ring-(--ui-secondary)/25 bg-(--ui-secondary)/10 hover:bg-(--ui-secondary)/15 disabled:bg-(--ui-secondary)/10 aria-disabled:bg-(--ui-secondary)/10 focus-visible:ring-2 focus-visible:ring-(--ui-secondary)`,
    } as const,
    {
      color: 'secondary',
      variant: 'ghost',
      class: `text-(--ui-secondary) hover:bg-(--ui-secondary)/10 focus-visible:bg-(--ui-secondary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent`,
    } as const,
    {
      color: 'secondary',
      variant: 'link',
      class: `text-(--ui-secondary) hover:text-(--ui-secondary)/75 disabled:text-(--ui-secondary) aria-disabled:text-(--ui-secondary) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-secondary)`,
    } as const,
    {
      color: 'success',
      variant: 'solid',
      class: `text-(--ui-bg) bg-(--ui-success) hover:bg-(--ui-success)/75 disabled:bg-(--ui-success) aria-disabled:bg-(--ui-success) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-success)`,
    } as const,
    {
      color: 'success',
      variant: 'outline',
      class: `ring ring-inset ring-(--ui-success)/50 text-(--ui-success) hover:bg-(--ui-success)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-success)`,
    } as const,
    {
      color: 'success',
      variant: 'soft',
      class: `text-(--ui-success) bg-(--ui-success)/10 hover:bg-(--ui-success)/15 focus-visible:bg-(--ui-success)/15 disabled:bg-(--ui-success)/10 aria-disabled:bg-(--ui-success)/10`,
    } as const,
    {
      color: 'success',
      variant: 'subtle',
      class: `text-(--ui-success) ring ring-inset ring-(--ui-success)/25 bg-(--ui-success)/10 hover:bg-(--ui-success)/15 disabled:bg-(--ui-success)/10 aria-disabled:bg-(--ui-success)/10 focus-visible:ring-2 focus-visible:ring-(--ui-success)`,
    } as const,
    {
      color: 'success',
      variant: 'ghost',
      class: `text-(--ui-success) hover:bg-(--ui-success)/10 focus-visible:bg-(--ui-success)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent`,
    } as const,
    {
      color: 'success',
      variant: 'link',
      class: `text-(--ui-success) hover:text-(--ui-success)/75 disabled:text-(--ui-success) aria-disabled:text-(--ui-success) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-success)`,
    } as const,
    {
      color: 'info',
      variant: 'solid',
      class: `text-(--ui-bg) bg-(--ui-info) hover:bg-(--ui-info)/75 disabled:bg-(--ui-info) aria-disabled:bg-(--ui-info) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-info)`,
    } as const,
    {
      color: 'info',
      variant: 'outline',
      class: `ring ring-inset ring-(--ui-info)/50 text-(--ui-info) hover:bg-(--ui-info)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-info)`,
    } as const,
    {
      color: 'info',
      variant: 'soft',
      class: `text-(--ui-info) bg-(--ui-info)/10 hover:bg-(--ui-info)/15 focus-visible:bg-(--ui-info)/15 disabled:bg-(--ui-info)/10 aria-disabled:bg-(--ui-info)/10`,
    } as const,
    {
      color: 'info',
      variant: 'subtle',
      class: `text-(--ui-info) ring ring-inset ring-(--ui-info)/25 bg-(--ui-info)/10 hover:bg-(--ui-info)/15 disabled:bg-(--ui-info)/10 aria-disabled:bg-(--ui-info)/10 focus-visible:ring-2 focus-visible:ring-(--ui-info)`,
    } as const,
    {
      color: 'info',
      variant: 'ghost',
      class: `text-(--ui-info) hover:bg-(--ui-info)/10 focus-visible:bg-(--ui-info)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent`,
    } as const,
    {
      color: 'info',
      variant: 'link',
      class: `text-(--ui-info) hover:text-(--ui-info)/75 disabled:text-(--ui-info) aria-disabled:text-(--ui-info) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-info)`,
    } as const,
    {
      color: 'warning',
      variant: 'solid',
      class: `text-(--ui-bg) bg-(--ui-warning) hover:bg-(--ui-warning)/75 disabled:bg-(--ui-warning) aria-disabled:bg-(--ui-warning) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-warning)`,
    } as const,
    {
      color: 'warning',
      variant: 'outline',
      class: `ring ring-inset ring-(--ui-warning)/50 text-(--ui-warning) hover:bg-(--ui-warning)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-warning)`,
    } as const,
    {
      color: 'warning',
      variant: 'soft',
      class: `text-(--ui-warning) bg-(--ui-warning)/10 hover:bg-(--ui-warning)/15 focus-visible:bg-(--ui-warning)/15 disabled:bg-(--ui-warning)/10 aria-disabled:bg-(--ui-warning)/10`,
    } as const,
    {
      color: 'warning',
      variant: 'subtle',
      class: `text-(--ui-warning) ring ring-inset ring-(--ui-warning)/25 bg-(--ui-warning)/10 hover:bg-(--ui-warning)/15 disabled:bg-(--ui-warning)/10 aria-disabled:bg-(--ui-warning)/10 focus-visible:ring-2 focus-visible:ring-(--ui-warning)`,
    } as const,
    {
      color: 'warning',
      variant: 'ghost',
      class: `text-(--ui-warning) hover:bg-(--ui-warning)/10 focus-visible:bg-(--ui-warning)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent`,
    } as const,
    {
      color: 'warning',
      variant: 'link',
      class: `text-(--ui-warning) hover:text-(--ui-warning)/75 disabled:text-(--ui-warning) aria-disabled:text-(--ui-warning) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-warning)`,
    } as const,
    {
      color: 'error',
      variant: 'solid',
      class: `text-(--ui-bg) bg-(--ui-error) hover:bg-(--ui-error)/75 disabled:bg-(--ui-error) aria-disabled:bg-(--ui-error) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-error)`,
    } as const,
    {
      color: 'error',
      variant: 'outline',
      class: `ring ring-inset ring-(--ui-error)/50 text-(--ui-error) hover:bg-(--ui-error)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-(--ui-error)`,
    } as const,
    {
      color: 'error',
      variant: 'soft',
      class: `text-(--ui-error) bg-(--ui-error)/10 hover:bg-(--ui-error)/15 focus-visible:bg-(--ui-error)/15 disabled:bg-(--ui-error)/10 aria-disabled:bg-(--ui-error)/10`,
    } as const,
    {
      color: 'error',
      variant: 'subtle',
      class: `text-(--ui-error) ring ring-inset ring-(--ui-error)/25 bg-(--ui-error)/10 hover:bg-(--ui-error)/15 disabled:bg-(--ui-error)/10 aria-disabled:bg-(--ui-error)/10 focus-visible:ring-2 focus-visible:ring-(--ui-error)`,
    } as const,
    {
      color: 'error',
      variant: 'ghost',
      class: `text-(--ui-error) hover:bg-(--ui-error)/10 focus-visible:bg-(--ui-error)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent`,
    } as const,
    {
      color: 'error',
      variant: 'link',
      class: `text-(--ui-error) hover:text-(--ui-error)/75 disabled:text-(--ui-error) aria-disabled:text-(--ui-error) focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-error)`,
    } as const,
    {
      color: 'neutral',
      variant: 'solid',
      class: 'text-(--ui-bg) bg-(--ui-bg-inverted) hover:bg-(--ui-bg-inverted)/90 disabled:bg-(--ui-bg-inverted) aria-disabled:bg-(--ui-bg-inverted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-border-inverted)',
    } as const,
    {
      color: 'neutral',
      variant: 'outline',
      class: 'ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg) hover:bg-(--ui-bg-elevated) disabled:bg-(--ui-bg) aria-disabled:bg-(--ui-bg) focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)',
    } as const,
    {
      color: 'neutral',
      variant: 'soft',
      class: 'text-(--ui-text) bg-(--ui-bg-elevated) hover:bg-(--ui-bg-accented)/75 focus-visible:bg-(--ui-bg-accented)/75 disabled:bg-(--ui-bg-elevated) aria-disabled:bg-(--ui-bg-elevated)',
    } as const,
    {
      color: 'neutral',
      variant: 'subtle',
      class: 'ring ring-inset ring-(--ui-border-accented) text-(--ui-text) bg-(--ui-bg-elevated) hover:bg-(--ui-bg-accented)/75 disabled:bg-(--ui-bg-elevated) aria-disabled:bg-(--ui-bg-elevated) focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)',
    } as const,
    {
      color: 'neutral',
      variant: 'ghost',
      class: 'text-(--ui-text) hover:bg-(--ui-bg-elevated) focus-visible:bg-(--ui-bg-elevated) hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent',
    } as const,
    {
      color: 'neutral',
      variant: 'link',
      class: 'text-(--ui-text-muted) hover:text-(--ui-text) disabled:text-(--ui-text-muted) aria-disabled:text-(--ui-text-muted) focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-(--ui-border-inverted)',
    } as const,
    {
      size: 'xs',
      square: true,
      class: 'p-1',
    } as const,
    {
      size: 'sm',
      square: true,
      class: 'p-1.5',
    } as const,
    {
      size: 'md',
      square: true,
      class: 'p-1.5',
    } as const,
    {
      size: 'lg',
      square: true,
      class: 'p-2',
    } as const,
    {
      size: 'xl',
      square: true,
      class: 'p-2',
    } as const,
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
  } as const,
}
