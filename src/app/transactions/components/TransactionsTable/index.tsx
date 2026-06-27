import {Order, OrderBy, Transaction} from "../../models/Transcation";
import {useState} from "react";
import {useFetchTransactions} from "../../hooks/useFetchTransactions";
import {getDateOnly} from "@/app/utils/formatDate";

interface TransactionsTableProps {
    setSelectedTransaction: (transaction: Transaction) => void;
}

export const TransactionsTable = ({setSelectedTransaction}: TransactionsTableProps) => {
    const [order, setOrder] = useState<Order>();
    const [orderBy, setOrderBy] = useState<OrderBy>();
    const {transactions} = useFetchTransactions({order, orderBy});

    return <table>
        <thead>
        <tr>
            <th>Counterparty</th>
            <th>Method</th>
            <th>Payment date</th>
            <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        {transactions.map((transaction) => (
            <tr key={transaction.id} onClick={() => setSelectedTransaction(transaction)}>
                <td>{transaction.counterpartyName}</td>
                <td>{transaction.operationType}</td>
                <td>{getDateOnly(transaction.createdAt)}</td>
                <td>
                    {`${transaction.amount.toLocaleString()} ${transaction.currency}`}
                </td>
            </tr>
        ))}
        </tbody>
    </table>
}
