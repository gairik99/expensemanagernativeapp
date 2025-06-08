export const expenseReducer = (state, { type, payload }) => {
  //   console.log("Reducer called", payload);
  switch (type) {
    case "ADD":
      const id = Math.random().toString(36).substring(2, 9);
      return [{ ...payload, id: id }, ...state];
    case "UPDATE":
      const updatedExpenseIndex = state.findIndex(
        (expense) => expense.id === payload.id
      );
      const updatedExpense = payload;
      const updatedExpenses = [...state];
      updatedExpenses[updatedExpenseIndex] = updatedExpense;
      return updatedExpenses;

    case "DELETE":
      const filteredExpenses = state.filter(
        (expense) => expense.id !== payload
      );
      return filteredExpenses;
    default:
      return state;
  }
};
