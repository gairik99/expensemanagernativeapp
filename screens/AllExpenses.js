import { useEffect } from "react";
import { ExpensesOutput } from "../components/ExpensesOutput";
import { useExpense } from "../hooks/useExpense";
import useFetch from "../hooks/useFetch";
import { getExpenses } from "../utils/api";
import { useUser } from "../hooks/useUser";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
const AllExpenses = () => {
  const { expenseDispatch, state } = useExpense();
  const { user } = useUser();
  const {
    data: fetchedExpenses,
    loading,
    error,
  } = useFetch(getExpenses, user?.accessToken);

  useEffect(() => {
    if (fetchedExpenses?.length) {
      expenseDispatch({ type: "SET", payload: fetchedExpenses });
    }
  }, [fetchedExpenses, expenseDispatch]);

  if (loading) {
    return <LoadingSpinner message="Loading expenses..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <ExpensesOutput
      expensePeriod="Total"
      expenses={state}
      fallback="No expenses found!"
    />
  );
};

export default AllExpenses;
