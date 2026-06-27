import {useEffect, useMemo, useState, useCallback} from "react";
import type {Order, OrderBy, Transaction} from "../models/Transcation";
import {buildTransaction} from "../models/Transcation";

interface UseFetchTransactionsProps {
  order?: Order;
  orderBy?: OrderBy;
}

interface UseFetchTransactionsResult {
  transactions: Transaction[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useFetchTransactions = ({
  order,
  orderBy
}: UseFetchTransactionsProps): UseFetchTransactionsResult => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchTransactions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://gist.githubusercontent.com/pserafini/31eca88d4aa0d6ab49684bd685e2f488/raw/75eb58279e7ebb8e89401cf6b843256157d103f4/transactions.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = await response.json();
            // Transform raw transactions using buildTransaction
            const transformedTransactions = json.transactions.map(buildTransaction);
            setTransactions(transformedTransactions);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const orderedTransactions = useMemo(() => {
        if (!order || !orderBy || transactions.length === 0) return transactions;

        return [...transactions].sort((a, b) => {
            if (orderBy === 'amount') {
                // amount is already a number, no need for parseFloat
                return order === 'asc'
                    ? a.amount - b.amount
                    : b.amount - a.amount;
            } else if (orderBy === 'createdAt') {
                // createdAt is already a Date object
                return order === 'asc'
                    ? a.createdAt.getTime() - b.createdAt.getTime()
                    : b.createdAt.getTime() - a.createdAt.getTime();
            }
            return 0;
        });
    }, [order, orderBy, transactions]);

    useEffect(() => {
        let isMounted = true;
        const loadData = async () => {
            if (isMounted) {
                await fetchTransactions();
            }
        };
        loadData();
        return () => {
            isMounted = false;
        };
    }, [fetchTransactions]);

    return {
        transactions: orderedTransactions,
        isLoading,
        error,
        refetch: fetchTransactions
    };
};
