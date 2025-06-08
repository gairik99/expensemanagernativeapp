import { useContext } from "react";
import { ExpenseContext } from "../context/expenseContext";

const useExpense = () => useContext(ExpenseContext);

export { useExpense };
