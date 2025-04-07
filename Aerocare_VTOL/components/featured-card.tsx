import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useColorScheme } from "react-native"
import { ChevronRight } from "lucide-react-native"

interface FeaturedCardProps {
  title: string
  description: string
  image: string
}

export function FeaturedCard({ title, description, image }: FeaturedCardProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
      <Image source={{ uri: `https://picsum.photos/300/200?random=${title}` }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>{title}</Text>
        <Text style={[styles.description, { color: isDark ? "#ccc" : "#666" }]}>{description}</Text>
        <View style={styles.footer}>
          <Text style={[styles.link, { color: "#4CAF50" }]}>View Details</Text>
          <ChevronRight size={16} color="#4CAF50" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 140,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "Inter-Medium",
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "Inter-Regular",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
    fontFamily: "Inter-Medium",
  },
})

