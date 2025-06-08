import { View, StyleSheet, Text } from "react-native";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";
import { GlobalStyles } from "../constants/styles";
export const ExpensesOutput = ({ expenses, expensePeriod, fallback }) => {
  let content = <Text style={styles.fallbackText}>{fallback}</Text>;
  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary periodLen={expensePeriod} expenses={expenses} />
      {/* <ExpenseList expenses={expenses} /> */}
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbackText: {
    color: GlobalStyles.colors.primary100,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
