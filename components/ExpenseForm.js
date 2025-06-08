import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const navigation = useNavigation();
  const [inputValues, setInputValues] = useState({
    amount: defaultValues?.amount?.toString() || "",
    date: defaultValues?.date.toISOString().slice(0, 10) || "",
    description: defaultValues?.description || "",
  });
  const inputChangeHandler = (inputIdentity, inputValue) => {
    // Handle input change
    setInputValues((prevValues) => ({
      ...prevValues,
      [inputIdentity]: inputValue,
    }));
  };
  // console.log("ExpenseForm", inputValues);
  const confirmHandler = () => {
    const expenseData = {
      amount: parseFloat(inputValues.amount),
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    onSubmit(expenseData);
    const isAmountValid = isNaN(expenseData?.amount) && expenseData?.amount > 0;
    const isDateValid = expenseData?.date.toString() === "Invalid Date";
    const isDescriptionValid = expenseData?.description.trim().length < 10;
    if (isAmountValid || isDateValid || isDescriptionValid) {
      Alert.alert(
        "Invalid input",
        "Please check your input values. Amount should be a positive number, date should be valid, and description should be at least 10 characters long.",
        [{ text: "Okay" }]
      );
      return;
    }
    navigation.goBack();
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.text}>Add Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={(value) => inputChangeHandler("amount", value)}
          style={styles.input}
          value={inputValues.amount}
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={(value) => inputChangeHandler("date", value)}
          style={styles.input}
          value={inputValues.date}
        />
      </View>
      <Input
        label="Description"
        multiline={true}
        onChangeText={(value) => inputChangeHandler("description", value)}
        value={inputValues.description}
      />
      <View style={styles.buttons}>
        <Button onPress={onCancel} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    padding: 4,
    marginTop: 40,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
