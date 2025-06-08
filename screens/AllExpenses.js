import { ExpensesOutput } from "../components/ExpensesOutput";
import { useExpense } from "../hooks/useExpense";

const AllExpenses = () => {
  const { state } = useExpense();

  return (
    <ExpensesOutput
      expensePeriod="Total"
      expenses={state}
      fallback="No expenses found!"
    />
  );
};

export default AllExpenses;
