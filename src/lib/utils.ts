import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as a USD currency string.
 *
 * @param amount - The numerical value to format as currency
 * @returns A formatted string representation of the amount in USD currency format (e.g., "$10.00")
 *
 * @example
 * formatCurrency(10.5) // Returns "$10.50"
 * formatCurrency(1000) // Returns "$1,000.00"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}
