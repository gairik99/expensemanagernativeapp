import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Decimal from "decimal.js";

const ExpenseSummary = ({ periodLen, expenses }) => {
  const totalExpenses = expenses?.reduce((sum, expense) => {
    return sum.plus(new Decimal(expense.amount || 0));
  }, new Decimal(0));

  const formattedTotal = totalExpenses.toFixed(2); //
  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{periodLen}</Text>
      <Text style={styles.amountText}>
        <FontAwesome5
          name="rupee-sign"
          size={20}
          color={GlobalStyles.colors.primary500}
        />
        {formattedTotal}
      </Text>
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
