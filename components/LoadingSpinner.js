import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingSpinner = ({
  message = "Loading...",
  size = "large",
  color = "#007AFF",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // optional: can use 'transparent'
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
