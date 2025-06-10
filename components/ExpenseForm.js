import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues?.amount?.toString() || "",
    date: defaultValues?.date || "",
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
    const { amount, date, description } = inputValues;

    const parsedAmount = parseFloat(amount);
    const parsedDate = new Date(date);
    const isAmountInvalid = isNaN(parsedAmount) || parsedAmount <= 0;
    const isDateInvalid =
      isNaN(parsedDate.getTime()) || date.trim().length !== 10;
    const isDescriptionInvalid = description.trim().length < 5;

    if (isAmountInvalid || isDateInvalid || isDescriptionInvalid) {
      Alert.alert(
        "Invalid input",
        "Please check your input values:\n- Amount must be a positive number\n- Date must be valid (YYYY-MM-DD)\n- Description must be at least 5 characters long.",
        [{ text: "Okay" }]
      );
      return;
    }

    const expenseData = {
      amount: parsedAmount,
      date: parsedDate.toISOString().slice(0, 10),
      description: description.trim(),
    };

    onSubmit(expenseData);
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.text}>
        {defaultValues?.id ? "Update Expense" : "Add Expense"}
      </Text>
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
