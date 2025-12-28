import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/src/components/ui/card';
import { Icon } from '@/src/components/ui/icon';
import { AlertTriangle } from 'lucide-react-native';

interface BudgetCardProps {
  /** Monthly budget amount */
  budget: number;
  /** Amount spent so far */
  spent: number;
  /** Currency symbol */
  currencySymbol?: string;
  /** Container className */
  className?: string;
}

export function BudgetCard({
  budget,
  spent,
  currencySymbol = '₹',
  className = '',
}: BudgetCardProps) {
  const remaining = budget - spent;
  const percentSpent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const isOverBudget = spent > budget;

  return (
    <Card variant="filled" className={`bg-background-900 p-4 ${className}`}>
      <View className="flex-row items-start justify-between mb-3">
        <View>
          <Text className="text-sm text-typography-400 mb-1">Monthly Budget</Text>
          <View className="flex-row items-baseline">
            <Text className={`text-3xl font-bold ${isOverBudget ? 'text-error-400' : 'text-typography-50'}`}>
              {currencySymbol}{Math.abs(remaining).toLocaleString('en-IN')}
              {isOverBudget && <Text className="text-error-400">-</Text>}
            </Text>
          </View>
        </View>
        
        {/* Status Badge */}
        <View className={`rounded-full px-3 py-1 ${isOverBudget ? 'bg-error-500/20' : 'bg-background-800'}`}>
          {isOverBudget ? (
            <View className="flex-row items-center">
              <Icon as={AlertTriangle} size="xs" className="text-error-400 mr-1" />
              <Text className="text-sm font-medium text-error-400">Over Budget</Text>
            </View>
          ) : (
            <Text className="text-sm font-medium text-success-400">
              ● {Math.round(percentSpent)}% Spent
            </Text>
          )}
        </View>
      </View>

      {/* Progress bar */}
      <View className="h-2 bg-background-700 rounded-full overflow-hidden mb-3">
        <View
          className={`h-full rounded-full ${isOverBudget ? 'bg-error-500' : 'bg-primary-500'}`}
          style={{ width: `${Math.min(percentSpent, 100)}%` }}
        />
      </View>

      {/* Footer */}
      <View className="flex-row justify-between">
        <Text className={`text-sm ${isOverBudget ? 'text-error-400' : 'text-primary-400'}`}>
          {currencySymbol}{spent.toLocaleString('en-IN')} spent
        </Text>
        <Text className="text-sm text-typography-400">
          Total: {currencySymbol}{budget.toLocaleString('en-IN')}
        </Text>
      </View>

      {/* Over Budget Warning */}
      {isOverBudget && (
        <View className="mt-3 p-3 rounded-xl bg-error-500/10 flex-row items-center">
          <Icon as={AlertTriangle} size="sm" className="text-error-400 mr-2" />
          <Text className="text-sm text-error-300 flex-1">
            You've exceeded your monthly budget by {currencySymbol}{Math.abs(remaining).toLocaleString('en-IN')}
          </Text>
        </View>
      )}
    </Card>
  );
}
