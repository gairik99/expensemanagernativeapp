import { View, Text, StyleSheet, Button } from "react-native";

const ErrorMessage = ({ message = "Something went wrong!", onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚠️ {message}</Text>
      <Button title="Try Again" onPress={onRetry} />
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white", // or transparent if overlay
  },
  text: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
