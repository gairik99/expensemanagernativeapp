import { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useExpense } from "../hooks/useExpense";
import ExpenseForm from "../components/ExpenseForm";
import { createExpense } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useUser } from "../hooks/useUser";
import { deleteExpense } from "../utils/api";
import { updateExpense } from "../utils/api";

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const { expenseDispatch, state } = useExpense();
  const { user } = useUser();
  const [apiCall, setApiCall] = useState({
    loading: false,
    error: null,
  });
  const selectedExpense = state.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    // console.log("deleteExpenseHandler");
    try {
      setApiCall({ loading: true, error: null });

      await deleteExpense(user.accessToken, expenseId); // backend delete

      expenseDispatch({ type: "DELETE", payload: expenseId }); // update local state
      navigation.goBack();
    } catch (error) {
      setApiCall({
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete expense",
      });
    } finally {
      setApiCall((prev) => ({ ...prev, loading: false }));
    }
  };
  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      try {
        setApiCall({ loading: true, error: null });

        const updated = await updateExpense(
          expenseData,
          user.accessToken,
          expenseId
        ); // API call
        expenseDispatch({
          type: "UPDATE",
          payload: { ...updated, id: expenseId }, // Update state with backend response
        });

        navigation.goBack();
      } catch (error) {
        setApiCall({
          loading: false,
          error:
            error.response?.data?.message ||
            error.message ||
            "Failed to update expense",
        });
      } finally {
        setApiCall((prev) => ({ ...prev, loading: false }));
      }
    } else {
      try {
        setApiCall({ loading: true, error: null });
        const response = await createExpense(expenseData, user.accessToken); // Call the API
        expenseDispatch({
          type: "ADD",
          payload: response, // Assuming the API returns the new expense with an ID
          // Dispatch new expense received from backend
        });
        navigation.goBack();
      } catch (error) {
        // console.error("Create Expense Error:", error);
        setApiCall({
          loading: false,
          error:
            error.response?.data?.message ||
            error.message ||
            "Failed to add expense",
        });
      } finally {
        setApiCall((prev) => ({ ...prev, loading: false }));
      }
    }
  };

  const clearError = () => {
    setApiCall((prev) => ({ ...prev, error: null }));
  };

  {
    apiCall.loading && <LoadingSpinner message="Saving expense..." />;
  }

  {
    apiCall.error && (
      <ErrorMessage message={apiCall.error} onRetry={clearError} />
    );
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
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
});

export default ManageExpense;
