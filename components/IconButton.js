import { StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function IconButton({ icon, color, size, onPress }) {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("ManageExpense");
  };
  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.iconButton}>
        <Ionicons name={icon} size={size} color={color} onPress={onPress} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    opacity: 0.75,
  },
});
