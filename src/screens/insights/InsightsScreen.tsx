import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/src/components/ui/icon';
import { InsightCard, HighlightText } from '@/src/components/custom/InsightCard';
import { 
  UtensilsCrossed, 
  Receipt, 
  Wallet, 
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Info
} from 'lucide-react-native';
import { getIconByName, formatCurrency } from '@/src/utils';
import { useExpenseStore } from '@/src/app/stores/useExpenseStore';
import { useOnboardingStore } from '@/src/app/stores/useOnboardingStore';

type BudgetStatus = 'excellent' | 'good' | 'warning' | 'exceeded';

function getBudgetStatus(spent: number, budget: number): BudgetStatus {
  if (budget === 0) return 'good';
  const percentage = (spent / budget) * 100;
  
  if (percentage <= 50) return 'excellent';
  if (percentage <= 80) return 'good';
  if (percentage <= 100) return 'warning';
  return 'exceeded';
}

function getBudgetStatusMessage(status: BudgetStatus): string {
  switch (status) {
    case 'excellent':
      return "You're managing your budget well.";
    case 'good':
      return "You're on track, but be mindful.";
    case 'warning':
      return "You're close to your budget limit.";
    case 'exceeded':
      return "You've exceeded your budget.";
  }
}

function getBudgetStatusIcon(status: BudgetStatus) {
  switch (status) {
    case 'excellent':
    case 'good':
      return ThumbsUp;
    case 'warning':
      return AlertTriangle;
    case 'exceeded':
      return ThumbsDown;
  }
}

function getBudgetStatusColors(status: BudgetStatus) {
  switch (status) {
    case 'excellent':
    case 'good':
      return { bg: 'bg-success-500/20', icon: 'text-success-400' };
    case 'warning':
      return { bg: 'bg-warning-500/20', icon: 'text-warning-400' };
    case 'exceeded':
      return { bg: 'bg-error-500/20', icon: 'text-error-400' };
  }
}

export function InsightsScreen() {
  const { onboardingData } = useOnboardingStore();
  const { 
    getTotalSpent, 
    getTodaySpending, 
    getTopSpendingCategory, 
    getRemainingDaysInMonth 
  } = useExpenseStore();

  const monthlyBudget = onboardingData.monthlyBudget;
  const totalSpent = getTotalSpent();
  const todaySpending = getTodaySpending();
  const topCategory = getTopSpendingCategory();
  const remainingDays = getRemainingDaysInMonth();
  
  // Calculate daily allowance
  const remainingBudget = Math.max(0, monthlyBudget - totalSpent);
  const dailyAllowance = remainingDays > 0 ? Math.floor(remainingBudget / remainingDays) : 0;
  
  // Calculate budget status
  const budgetStatus = getBudgetStatus(totalSpent, monthlyBudget);
  const statusMessage = getBudgetStatusMessage(budgetStatus);
  const StatusIcon = getBudgetStatusIcon(budgetStatus);
  const statusColors = getBudgetStatusColors(budgetStatus);

  return (
    <SafeAreaView className="flex-1 bg-background-950">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-6">
          <Text className="text-3xl font-bold text-typography-50 mb-1">
            Insights
          </Text>
          <Text className="text-base text-typography-400">
            Your spending at a glance
          </Text>
        </View>

        {/* Insight Cards */}
        <View className="px-5 gap-4">
          {/* Top Spending Category */}
          <InsightCard
            icon={topCategory ? getIconByName(topCategory.categoryIcon) : UtensilsCrossed}
            title="Top Spending Category"
            iconBgColor="bg-primary-500/20"
            iconColor="text-primary-400"
          >
            {topCategory ? (
              <>
                You spent the most on <HighlightText>{topCategory.categoryName}</HighlightText> this month.
              </>
            ) : (
              'No expenses recorded this month yet.'
            )}
          </InsightCard>

          {/* Today's Spending */}
          <InsightCard
            icon={Receipt}
            title="Today's Spending"
            iconBgColor="bg-secondary-500/20"
            iconColor="text-secondary-400"
          >
            {todaySpending > 0 ? (
              <>
                You spent <HighlightText>{formatCurrency(todaySpending)}</HighlightText> today.
              </>
            ) : (
              "You haven't spent anything today."
            )}
          </InsightCard>

          {/* Daily Allowance */}
          <InsightCard
            icon={Wallet}
            title="Daily Allowance"
            iconBgColor="bg-info-500/20"
            iconColor="text-info-400"
          >
            {remainingBudget > 0 ? (
              <>
                You can spend <HighlightText>{formatCurrency(dailyAllowance)}</HighlightText> per day to stay within budget.
              </>
            ) : (
              "You've used your entire budget for this month."
            )}
          </InsightCard>

          {/* Budget Status */}
          <InsightCard
            icon={StatusIcon}
            title="Budget Status"
            iconBgColor={statusColors.bg}
            iconColor={statusColors.icon}
          >
            {statusMessage}
          </InsightCard>
        </View>

        {/* Footer Note */}
        <View className="flex-row items-center justify-center mt-8 px-5">
          <Icon as={Info} size="xs" className="text-typography-600 mr-2" />
          <Text className="text-xs text-typography-600">
            Insights update automatically as you add expenses.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
