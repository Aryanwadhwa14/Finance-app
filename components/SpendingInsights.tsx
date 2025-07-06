'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Brain, Calendar, Target, AlertCircle } from 'lucide-react';
import { getSpendingInsights } from '@/lib/transactions';

interface SpendingInsightsProps {
  refreshTrigger: number;
}

export default function SpendingInsights({ refreshTrigger }: SpendingInsightsProps) {
  const [insights, setInsights] = useState({
    currentMonthExpenses: 0,
    lastMonthExpenses: 0,
    monthlyChange: 0,
    topCategory: 'None',
    topCategoryAmount: 0,
    averageDailySpending: 0,
  });

  useEffect(() => {
    loadInsights();
  }, [refreshTrigger]);

  const loadInsights = () => {
    const data = getSpendingInsights();
    setInsights(data);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />;
    if (change < 0) return <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />;
    return <Target className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-red-600 dark:text-red-400';
    if (change < 0) return 'text-green-600 dark:text-green-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getChangeBadgeColor = (change: number) => {
    if (change > 0) return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800';
    if (change < 0) return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800';
    return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700';
  };

  const getInsightMessage = () => {
    const { monthlyChange, averageDailySpending, topCategory } = insights;
    
    if (monthlyChange > 20) {
      return {
        type: 'warning',
        message: `Your spending increased by ${Math.abs(monthlyChange).toFixed(1)}% this month. Consider reviewing your ${topCategory} expenses.`,
        icon: AlertCircle,
        color: 'text-red-600 dark:text-red-400'
      };
    } else if (monthlyChange < -10) {
      return {
        type: 'success',
        message: `Great job! You reduced spending by ${Math.abs(monthlyChange).toFixed(1)}% this month.`,
        icon: TrendingDown,
        color: 'text-green-600 dark:text-green-400'
      };
    } else if (averageDailySpending > 100) {
      return {
        type: 'info',
        message: `You're spending an average of ${formatCurrency(averageDailySpending)} per day. Consider setting daily spending limits.`,
        icon: Target,
        color: 'text-blue-600 dark:text-blue-400'
      };
    } else {
      return {
        type: 'neutral',
        message: `Your spending patterns are relatively stable. Keep monitoring your ${topCategory} category.`,
        icon: Brain,
        color: 'text-gray-600 dark:text-gray-400'
      };
    }
  };

  const insightData = getInsightMessage();

  return (
    <Card className="w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl">
      <CardHeader className="pb-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white font-walkway">
              Spending Insights
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-lg mt-1 font-walkway">
              AI-powered analysis of your financial patterns
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Metrics */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-walkway">
              Key Metrics
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-walkway">
                    This Month
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white font-walkway">
                  {formatCurrency(insights.currentMonthExpenses)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-walkway">
                    Last Month
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white font-walkway">
                  {formatCurrency(insights.lastMonthExpenses)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  {getChangeIcon(insights.monthlyChange)}
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-walkway">
                    Monthly Change
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xl font-bold ${getChangeColor(insights.monthlyChange)} font-walkway`}>
                    {insights.monthlyChange > 0 ? '+' : ''}{insights.monthlyChange.toFixed(1)}%
                  </span>
                  <Badge className={`font-semibold px-3 py-1 ${getChangeBadgeColor(insights.monthlyChange)} font-walkway`}>
                    {insights.monthlyChange > 0 ? 'Increase' : insights.monthlyChange < 0 ? 'Decrease' : 'No Change'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-walkway">
                    Daily Average
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white font-walkway">
                  {formatCurrency(insights.averageDailySpending)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200 font-walkway">
                    Top Category
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white font-walkway">
                    {insights.topCategory}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-walkway">
                    {formatCurrency(insights.topCategoryAmount)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-walkway">
              AI Analysis
            </h3>
            
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <insightData.icon className={`h-6 w-6 ${insightData.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 font-walkway">
                      Smart Recommendation
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base font-walkway">
                      {insightData.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                <CardContent className="p-4">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2 font-walkway">
                    💡 Pro Tip
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-walkway">
                    Set up budgets for your top spending categories to better control your expenses.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                <CardContent className="p-4">
                  <h5 className="font-bold text-gray-900 dark:text-white mb-2 font-walkway">
                    📊 Trend Analysis
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-walkway">
                    {insights.monthlyChange > 0 
                      ? 'Your spending trend is increasing. Consider reviewing recent purchases.'
                      : insights.monthlyChange < 0
                      ? 'Your spending trend is decreasing. Great job on controlling expenses!'
                      : 'Your spending is stable. Maintain this consistency.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}