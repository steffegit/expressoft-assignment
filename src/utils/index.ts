export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function generateOrderId(): string {
  return 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}
