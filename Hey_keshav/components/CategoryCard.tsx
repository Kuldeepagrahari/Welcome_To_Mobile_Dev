import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface CategoryCardProps {
  title: string
  emoji: string
  description: string
  onPress: () => void
  colorScheme?: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, emoji, description, onPress, colorScheme }) => {
  const isDark = colorScheme === "dark"

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? "rgba(30, 30, 30, 0.8)" : "#FFF8E1",
          borderColor: isDark ? "#333333" : "#E6D9B8",
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: isDark ? "#FFC107" : "#5D4037" }]}>{title}</Text>
          <Text style={[styles.description, { color: isDark ? "#E6D9B8" : "#8D6E63" }]}>{description}</Text>
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
    fontWeight: "500",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
  },
})

export default CategoryCard

