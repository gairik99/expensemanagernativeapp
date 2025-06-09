import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
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
import { useUser } from "./hooks/useUser";

// Create navigators outside components
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

// Auth Navigator Component
function AuthOverview() {
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
        name="SignIn"
        options={{
          title: "Sign In",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="enter" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        component={SignUpScreen}
        name="SignUp"
        options={{
          title: "Sign Up",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Main App Navigator Component
function ExpensesOverview() {
  const navigation = useNavigation();
  const { clearUser } = useUser();
  function logoutHandler() {
    clearUser(); // clears user state, effectively logging out
  }

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <>
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate("ManageExpense")}
            />

            <IconButton
              icon="log-out-outline" // Ionicons logout icon
              size={24}
              color={tintColor}
              onPress={logoutHandler}
              style={{ marginLeft: 15 }}
            />
          </>
        ),
      }}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Main content with conditional routing
function AppContent() {
  const { user } = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: "white",
        }}
      >
        {user.accessToken ? (
          // Authenticated screens
          <>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                title: "Manage Expense",
                presentation: "modal",
              }}
            />
          </>
        ) : (
          // Auth screens
          <Stack.Screen
            name="Auth"
            component={AuthOverview}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Main App Component
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <UserProvider>
        <ExpenseProvider>
          <AppContent />
        </ExpenseProvider>
      </UserProvider>
    </>
  );
}
