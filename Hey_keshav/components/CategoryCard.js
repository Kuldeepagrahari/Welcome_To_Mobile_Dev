import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const CategoryCard = ({ title, emoji, description, onPress, colorScheme }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colorScheme === "dark" ? "rgba(30, 30, 30, 0.8)" : "#FFF8E1",
          borderColor: colorScheme === "dark" ? "#333333" : "#E6D9B8",
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colorScheme === "dark" ? "#FFC107" : "#5D4037" }]}>{title}</Text>
          <Text style={[styles.description, { color: colorScheme === "dark" ? "#E6D9B8" : "#8D6E63" }]}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 32,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
})

export default CategoryCard

