
export interface Transaction {
    id: string;
    createdAt: Date;
    counterpartyName: string;
    isDebit: boolean;
    amount: number;
    currency: Currency;
    operationType: OperationType;
}
export const buildTransaction = (raw: TransactionRaw): Transaction => ({
    id: raw.id,
    createdAt: new Date(raw.created_at),
    counterpartyName: raw.counterparty_name,
    isDebit: !!raw.debit,
    amount: parseFloat(raw.amount),
    currency: raw.currency,
    operationType: raw.operation_type,
});

export type Order = 'asc' | 'desc';
export type OrderBy = 'amount' | 'createdAt';

type OperationType = "transfer" | "refund" | "purchase" | "cashback";
type Currency = "USD" | "EUR";
interface TransactionRaw {
    id: string;
    created_at: string;
    counterparty_name: string;
    debit: string;
    credit: string;
    amount: string;
    currency: Currency;
    operation_type: OperationType;
    attachments: Array<{url:string}>;
}



