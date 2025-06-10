import { ExpensesOutput } from "../components/ExpensesOutput";
import { useExpense } from "../hooks/useExpense";
// import { useUser } from "../hooks/useUser";

const RecentExpenses = () => {
  const { state } = useExpense();
  const recentExpenses = state.filter((expense) => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const expenseDate = new Date(expense.date);
    return expenseDate >= sevenDaysAgo && expenseDate <= today;
  });
  // console.log("RecentExpenses", recentExpenses);
  return (
    <ExpensesOutput
      expensePeriod="Last 7 Days"
      expenses={recentExpenses}
      fallback="No recent expenses registered in the last 7 days."
    />
  );
};

export default RecentExpenses;
