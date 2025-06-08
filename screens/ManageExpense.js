import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
// import Button from "../components/Button";
import { useExpense } from "../hooks/useExpense";
import ExpenseForm from "../components/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const { expenseDispatch, state } = useExpense();
  // console.log("isEditing", isEditing);
  // console.log("ManageExpense", expenseId);
  const selectedExpense = state.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    // console.log("deleteExpenseHandler");
    expenseDispatch({ type: "DELETE", payload: expenseId });
    navigation.goBack();
  };
  const cancelHandler = () => {
    // console.log("cancelHandler");
    navigation.goBack();
  };
  const confirmHandler = (expenseData) => {
    if (isEditing) {
      expenseDispatch({
        type: "UPDATE",
        payload: { ...expenseData, id: expenseId },
      });
    } else {
      expenseDispatch({ type: "ADD", payload: expenseData });
    }
  };
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {/* <View style={styles.buttons}>
        <Button onPress={cancelHandler} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View> */}
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={32}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 4,
    borderRadius: 8,
    borderTopWidth: 4,
    borderTopColor: GlobalStyles.colors.primary500,
    alignItems: "center",
  },
  // buttons: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // button: {
  //   minWidth: 120,
  //   marginHorizontal: 8,
  // },
});

export default ManageExpense;
