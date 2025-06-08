import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";

export default function SignInScreen() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const handleLogin = () => {
    const { username, password } = credentials;

    if (!username || !password) {
      return Alert.alert(
        "Validation Error",
        "Please enter both username and password."
      );
    }

    // Simulate login or integrate your API here
    console.log("Logging in with:", credentials);
    Alert.alert("Login Successful", `Welcome, ${username}!`);
  };

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
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
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
