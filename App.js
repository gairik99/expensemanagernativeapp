import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/IconButton";
import { ExpenseProvider } from "./context/expenseContext";
import { UserProvider } from "./context/userContext";
import SignUpScreen from "./screens/Signup";
import SignInScreen from "./screens/SignIn";

export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTab = createBottomTabNavigator();

  const AuthOverview = () => {
    return (
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
        }}
      >
        <BottomTab.Screen
          component={SignInScreen}
          name="Sign In"
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="enter" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          component={SignUpScreen}
          name="Sign Up"
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="create" size={size} color={color} />;
            },
          }}
        />
      </BottomTab.Navigator>
    );
  };

  const ExpensesOverview = () => {
    return (
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton icon="add" size={24} color={tintColor} />
          ),
        }}
      >
        <BottomTab.Screen
          name="recentExpenses"
          component={RecentExpenses}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="hourglass" size={size} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name="allExpenses"
          component={AllExpenses}
          options={{
            title: "All Expenses",
            tabBarLabel: "All ",
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="calendar" size={size} color={color} />;
            },
          }}
        />
      </BottomTab.Navigator>
    );
  };
  return (
    <>
      <StatusBar style="light" />
      <UserProvider>
        <ExpenseProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
              }}
            >
              <Stack.Screen
                component={AuthOverview}
                name="Auth"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="expenseOverview"
                component={ExpensesOverview}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="manageExpense"
                component={ManageExpense}
                options={{
                  title: "Manage Expense",
                  presentation: "modal",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ExpenseProvider>
      </UserProvider>
    </>
  );
}
