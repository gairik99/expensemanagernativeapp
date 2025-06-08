import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
const ExpenseList = ({ expenses }) => {
  // console.log("ExpenseList", expenses);
  // const renderExpenseItem = (itemData) => {
  //   return <Text>{itemData.item.description}</Text>;
  // };
  return (
    <FlatList
      data={expenses}
      renderItem={(itemData) => <ExpenseItem {...itemData.item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpenseList;
