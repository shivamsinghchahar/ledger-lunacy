import { useState, useEffect } from "react";

import Transaction from "../Transaction";
import Loader from "../Loader";

import { formattedCurrency } from "../../utils";

const Ledger = () => {
  const [loading, setLoading] = useState(false);
  const [ledger, setLedger] = useState(null);

  const ensureLedgerSorted = (ledger) =>
    ledger.sort((a, b) => new Date(b.date) - new Date(a.date));

  const ensureUniqueTransactions = (ledger) => {
    const uniqueLedger = new Map();

    ledger.forEach((transaction) =>
      uniqueLedger.set(transaction.activity_id, transaction)
    );

    return Array.from(uniqueLedger.values());
  };

  const accountBalance = () => formattedCurrency(ledger?.[1]?.balance || 0);

  const fetchLedger = async () => {
    try {
      setLoading(true);
      const response = await fetch("data/complicated_ledger.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      let data = await response.json();
      data = ensureLedgerSorted(ensureUniqueTransactions(data));
      setLedger(data);
    } catch (error) {
      console.dir(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex-1">
      <div className="flex flex-col px-6 py-8 space-y-2 bg-gray-200 shadow-inner">
        <div className="w-full max-w-screen-xl mx-auto">
          <h2 className="text-4xl">{accountBalance()}</h2>
          <span className="text-3xl uppercase font-extralight">Balance</span>
        </div>
      </div>

      <div className="px-6 py-8">
        <table className="w-full max-w-screen-xl mx-auto divide-y table-fixed">
          <caption className="my-6 mb-4 text-3xl font-medium text-left">
            Past Transactions
          </caption>

          <thead>
            <tr className="text-left border-b-2">
              <th className="py-3 text-lg font-light">Date</th>
              <th className="py-3 text-lg font-light">Transaction</th>
              <th className="py-3 text-lg font-light"></th>
              <th className="py-3 text-lg font-light"></th>
              <th className="py-3 text-lg font-light text-right">Amount</th>
              <th className="py-3 text-lg font-light text-right">Balance</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {ledger?.map((transaction) => (
              <Transaction
                key={transaction.activity_id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Ledger;
