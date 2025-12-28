import * as LucideIcons from 'lucide-react-native';

/**
 * Get a Lucide icon component by its string name
 * @param iconName - The name of the icon (e.g., 'UtensilsCrossed', 'Cookie')
 * @returns The icon component or Circle as fallback
 */
export function getIconByName(iconName: string): React.ComponentType<any> {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<any>>;
  return icons[iconName] || LucideIcons.Circle;
}

/**
 * Format a date string for expense display
 * Shows "Today", "Yesterday", or date with time
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Today, 2:30 PM")
 */
export function formatExpenseDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (isToday) return `Today, ${timeStr}`;
  if (isYesterday) return `Yesterday, ${timeStr}`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + `, ${timeStr}`;
}

/**
 * Format currency with Indian locale
 * @param amount - The amount to format
 * @param currencySymbol - Currency symbol (default: ₹)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currencySymbol: string = '₹'): string {
  return `${currencySymbol}${amount.toLocaleString('en-IN')}`;
}

/**
 * Generate a unique ID
 * @param prefix - Optional prefix for the ID
 * @returns Unique string ID
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
