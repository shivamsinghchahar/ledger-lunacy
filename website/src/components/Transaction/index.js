import cn from "classnames";

import { formattedCurrency, formattedDate } from "../../utils";

const Transaction = ({ transaction }) => {
  const formattedDescription = () => {
    const { destination, source } = transaction;
    let sourceDescription = "";
    if (source?.description) {
      sourceDescription =
        source.description === "Investor description"
          ? ""
          : `• ${source.description}`;
    }

    return `${destination.description} ${sourceDescription}`;
  };

  const transactionType = () =>
    (transaction?.requester?.type || transaction.type).toLowerCase();

  return (
    <tr>
      <td className="py-4 text-lg">{formattedDate(transaction.date)}</td>
      <td className="py-4 text-lg capitalize">{transactionType()}</td>
      <td colSpan="2" className="py-4 text-lg text-gray-400">
        {formattedDescription()}
      </td>
      <td
        className={cn("py-4 text-lg text-right", {
          "font-bold": transaction.amount <= 0
        })}
      >
        {formattedCurrency(transaction.amount)}
      </td>
      <td
        className={cn("py-4 text-lg text-right", {
          "font-bold": transaction.balance <= 0
        })}
      >
        {formattedCurrency(transaction.balance)}
      </td>
    </tr>
  );
};

export default Transaction;
