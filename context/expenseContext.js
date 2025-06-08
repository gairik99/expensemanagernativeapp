import { createContext, useReducer } from "react";
import { expenseReducer } from "../reducers/reducer";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2025-01-01"),
  },
  {
    id: "e2",
    description: "A pair of pants",
    amount: 39.99,
    date: new Date("2025-01-02"),
  },
  {
    id: "e3",
    description: "A book",
    amount: 29.99,
    date: new Date("2025-01-03"),
  },
  {
    id: "e4",
    description: "Coffee at Starbucks",
    amount: 4.5,
    date: new Date("2025-05-20"),
  },
  {
    id: "e5",
    description: "Groceries",
    amount: 75.25,
    date: new Date("2025-01-05"),
  },
  {
    id: "e6",
    description: "Internet Bill",
    amount: 45.0,
    date: new Date("2025-01-06"),
  },
  {
    id: "e7",
    description: "Movie Tickets",
    amount: 18.0,
    date: new Date("2025-01-07"),
  },
  {
    id: "e8",
    description: "Monthly Gym Membership",
    amount: 50.0,
    date: new Date("2025-01-08"),
  },
  {
    id: "e9",
    description: "Uber Ride",
    amount: 12.75,
    date: new Date("2025-01-09"),
  },
  {
    id: "e10",
    description: "Electricity Bill",
    amount: 60.0,
    date: new Date("2025-01-10"),
  },
];

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const [state, expenseDispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);
  return (
    <ExpenseContext.Provider value={{ state, expenseDispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseProvider };
