import { Pressable, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import { formatteDate } from "../utils/date";

const ExpenseItem = ({ description, amount, date, id }) => {
  // console.log("ExpenseItem", amount);
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("manageExpense", {
      expenseId: id,
    });
  };
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.text, styles.description]}>{description}</Text>
          <Text style={styles.text}>{formatteDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
  },
  text: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary50,
  },
});

export default ExpenseItem;
