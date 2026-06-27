"use client";

import {TransactionsTable} from "./components/TransactionsTable";
import {TransactionDetails} from "./components/TransactionDetails";
import {useState} from "react";
import {Transaction} from "./models/Transcation";


export default function TransactionsPage() {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();
    return <>
        <h1>History</h1>
        <section>
            <TransactionsTable setSelectedTransaction={setSelectedTransaction}  />
            <TransactionDetails transaction={selectedTransaction} />
        </section>
    </>
}
