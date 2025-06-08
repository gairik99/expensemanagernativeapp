import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const ExpenseSummary = ({ periodLen, expenses }) => {
  const totalExpenses = expenses?.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{periodLen}</Text>
      <Text style={styles.amountText}>$ {totalExpenses}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 8,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  periodText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  amountText: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});

export default ExpenseSummary;
