import { ExpensesOutput } from "../components/ExpensesOutput";
import { useExpense } from "../hooks/useExpense";

const RecentExpenses = () => {
  const { state } = useExpense();
  const recentExpenses = state.filter((expense) => {
    const today = new Date();
    const expenseDate = new Date(expense.date);
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
    return expenseDate >= sevenDaysAgo;
  });
  return (
    <ExpensesOutput
      expensePeriod="Last 7 Days"
      expenses={recentExpenses}
      fallback="No recent expenses registered in the last 7 days."
    />
  );
};

export default RecentExpenses;
