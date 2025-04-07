import { Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useColorScheme } from "react-native"
import { ShoppingBag, Coffee, Utensils, Gift, Shirt } from "lucide-react-native"

const CATEGORIES = [
  { id: "1", name: "All", icon: ShoppingBag },
  { id: "2", name: "Food", icon: Utensils },
  { id: "3", name: "Drinks", icon: Coffee },
  { id: "4", name: "Gifts", icon: Gift },
  { id: "5", name: "Apparel", icon: Shirt },
]

export function CategoryList() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {CATEGORIES.map((category, index) => {
        const Icon = category.icon
        const isActive = index === 0

        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.category,
              { backgroundColor: isDark ? "#1e1e1e" : "#fff" },
              isActive && { backgroundColor: "#4CAF50" },
            ]}
          >
            <Icon size={24} color={isActive ? "#fff" : isDark ? "#ccc" : "#666"} />
            <Text style={[styles.categoryName, { color: isDark ? "#ccc" : "#666" }, isActive && { color: "#fff" }]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
  category: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 100,
    height: 100,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
})

