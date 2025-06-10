import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useUser } from "../hooks/useUser";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { loginUser } from "../utils/api";
export default function SignInScreen() {
  const { setUser } = useUser();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [apiCall, setApiCall] = useState({
    loading: false,
    error: null,
  });

  const handleChange = (key, value) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const handleLogin = async () => {
    const { username, password } = credentials;
    // console.log("Login Credentials:", credentials);

    if (!username || !password) {
      return Alert.alert(
        "Validation Error",
        "Please enter both username and password."
      );
    }

    try {
      setApiCall({ loading: true, error: null });

      const response = await loginUser(credentials);
      // console.log("Registration Response:", response);
      setUser({
        username: response.username,
        email: response.email,
        accessToken: response.access,
        refreshToken: response.refresh,
      });
    } catch (error) {
      // console.error("Registration Error:", error);

      // If error is an object of validation errors, join them
      if (typeof error === "object") {
        // Flatten all error messages into one string
        const messages = Object.values(error).flat().join("\n");

        setApiCall({
          loading: false,
          error: messages || "Something went wrong.",
        });
      } else {
        setApiCall({
          loading: false,
          error: error.message || "Something went wrong.",
        });
      }
    } finally {
      setApiCall((prev) => ({ ...prev, loading: false }));
    }

    Alert.alert(
      `Welcome back, ${credentials.username}!`,
      "You have successfully logged in."
    );
    setCredentials({
      username: "",
      password: "",
    });
  };

  // console.log("user", user);

  const clearError = () => {
    setApiCall((prev) => ({ ...prev, error: null }));
  };

  if (apiCall.loading) return <LoadingSpinner message="Logging In..." />;
  if (apiCall.error)
    return <ErrorMessage message={apiCall.error} onRetry={clearError} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={credentials.username}
        onChangeText={(text) => handleChange("username", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={credentials.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      <View style={styles.button}>
        <Button title="Sign In" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});
