import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Link } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={64} color="#8D6E63" />
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.message}>The wisdom you seek is elsewhere on the path.</Text>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#5D4037",
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: "#8D6E63",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#8D6E63",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
})

