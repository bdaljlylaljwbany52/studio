import React from 'react';
import DataEntry from '@/components/data-entry';
import TransactionList from '@/components/transaction-list'; // Assuming this component exists

export default function FinancesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Finances</h1>
      <p className="text-muted-foreground">
        Record and review your revenue and expenses.
      </p>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <DataEntry />
        </div>
        <div className="lg:col-span-2">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
