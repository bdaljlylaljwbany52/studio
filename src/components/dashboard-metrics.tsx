'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage'; // Assuming this hook exists

type Transaction = {
  id: string;
  type: 'revenue' | 'expense';
  amount: number;
  date: string;
  description: string;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const DashboardMetrics = () => {
  const [transactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [profit, setProfit] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateMetrics = () => {
      setLoading(true);
      try {
        const totalRevenue = transactions
          .filter((t) => t.type === 'revenue')
          .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        setRevenue(totalRevenue);
        setExpenses(totalExpenses);
        setProfit(totalRevenue - totalExpenses);
      } catch (error) {
        console.error("Error calculating metrics:", error);
        // Handle error state if needed
      } finally {
        // Simulate loading delay for visual effect
        setTimeout(() => setLoading(false), 500);
      }
    };

    calculateMetrics();
  }, [transactions]);

  const metrics = [
    { title: 'Total Revenue', value: revenue, icon: TrendingUp, color: 'text-green-600' },
    { title: 'Total Expenses', value: expenses, icon: TrendingDown, color: 'text-red-600' },
    { title: 'Net Profit', value: profit, icon: DollarSign, color: profit >= 0 ? 'text-blue-600' : 'text-red-600' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title} className="shadow-md transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-5 w-5 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-3/4" />
            ) : (
              <div className="text-2xl font-bold">{formatCurrency(metric.value)}</div>
            )}
            {/* Optional: Add a small percentage change or trend indicator here */}
            {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
