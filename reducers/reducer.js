export const expenseReducer = (state, { type, payload }) => {
  //   console.log("Reducer called", payload);
  switch (type) {
    case "ADD":
      return [payload, ...state];
    case "UPDATE":
      const updatedExpenseIndex = state.findIndex(
        (expense) => expense.id === payload.id
      );
      const updatedExpense = payload;
      const updatedExpenses = [...state];
      updatedExpenses[updatedExpenseIndex] = updatedExpense;
      return updatedExpenses;
    case "SET":
      return payload;
    case "DELETE":
      const filteredExpenses = state.filter(
        (expense) => expense.id !== payload
      );
      return filteredExpenses;
    case "CLEAR_ALL":
      return [];
    default:
      return state;
  }
};
