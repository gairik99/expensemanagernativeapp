import { useState } from "react";
import { useUser } from "../hooks/useUser";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { registerUser } from "../utils/api";

export default function SignUpScreen() {
  const { setUser } = useUser();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [apiCall, setApiCall] = useState({
    loading: false,
    error: null,
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { first_name, last_name, username, email, password, password2 } =
      form;

    // Basic validation
    if (
      !first_name ||
      !last_name ||
      !username ||
      !email ||
      !password ||
      !password2
    ) {
      return Alert.alert("Validation Error", "Please fill all fields.");
    }

    // Password strength validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long, contain at least one uppercase letter, one letter, and one special character."
      );
    }

    if (password !== password2) {
      return Alert.alert("Password Mismatch", "Passwords do not match.");
    }

    // You can now send `form` data to backend
    try {
      setApiCall({ loading: true, error: null });

      const response = await registerUser(form);
      // console.log("Registration Response:", response);
      setUser({
        firstName: response.data.first_name, // map API field to your state key
        lastName: response.data.last_name,
        username: response.data.username,
        email: response.data.email,
        accessToken: response.access,
        refreshToken: response.refresh,
      });

      setForm({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password2: "",
      });

      Alert.alert("Success", "Account created successfully!");
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
  };

  const clearError = () => {
    setApiCall((prev) => ({ ...prev, error: null }));
  };

  if (apiCall.loading) return <LoadingSpinner message="Creating account..." />;
  if (apiCall.error)
    return <ErrorMessage message={apiCall.error} onRetry={clearError} />;
  // console.log("user", user);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // Adjust if necessary
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={form.first_name}
            onChangeText={(text) => handleChange("first_name", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={form.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={form.username}
            onChangeText={(text) => handleChange("username", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={form.password2}
            onChangeText={(text) => handleChange("password2", text)}
          />

          <View style={styles.button}>
            <Button title="Sign Up" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
});
