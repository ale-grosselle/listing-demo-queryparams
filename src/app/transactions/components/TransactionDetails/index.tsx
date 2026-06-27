import type { Transaction } from "../../models/Transcation";

interface Props {
    transaction?: Transaction
}

export const TransactionDetails = ({ transaction }: Props) => {
    if (!transaction) return <p>No transaction selected</p>;

    return (
        <div>
            <h2>Transaction Details</h2>
            <p><strong>Counterparty:</strong> {transaction.counterpartyName}</p>
            <p><strong>Method:</strong> {transaction.operationType}</p>
            <p><strong>Payment Date:</strong> {transaction.createdAt.toLocaleDateString()}</p>
            <p><strong>Amount:</strong> {transaction.isDebit ? `- $${transaction.amount}` : `+ $${transaction.amount}`}</p>
        </div>
    );
}
