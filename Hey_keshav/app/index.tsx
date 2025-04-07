"use client"

import { useEffect, useState } from "react"
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image, useColorScheme } from "react-native"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import CategoryCard from "../components/CategoryCard"

// Define the category type
interface Category {
  id: number
  title: string
  emoji: string
  chapters: number[]
  description: string
}

// Categories data
const categories: Category[] = [
  {
    id: 1,
    title: "I feel anxious or stuck",
    emoji: "😟",
    chapters: [2],
    description: "Find peace in uncertainty",
  },
  {
    id: 2,
    title: "Family issues are overwhelming",
    emoji: "👨‍👩‍👧‍👦",
    chapters: [1, 3],
    description: "Balance duty and compassion",
  },
  {
    id: 3,
    title: "I'm exhausted from work/study",
    emoji: "😩",
    chapters: [3, 6],
    description: "Discover sustainable effort",
  },
  {
    id: 4,
    title: "I overthink everything",
    emoji: "🤔",
    chapters: [18],
    description: "Quiet the restless mind",
  },
  {
    id: 5,
    title: "I'm feeling lonely or emotional",
    emoji: "💔",
    chapters: [12],
    description: "Connect with divine love",
  },
  {
    id: 6,
    title: "I don't know who I am",
    emoji: "🔍",
    chapters: [2, 4],
    description: "Discover your true self",
  },
  {
    id: 7,
    title: "I lost someone",
    emoji: "😢",
    chapters: [2],
    description: "Find comfort in eternal truth",
  },
  {
    id: 8,
    title: "I can't make decisions",
    emoji: "🤷‍♂️",
    chapters: [18],
    description: "Gain clarity and purpose",
  },
  {
    id: 9,
    title: "I want to explore spirituality",
    emoji: "✨",
    chapters: [10, 15],
    description: "Journey into divine wisdom",
  },
]

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from storage (simplified without AsyncStorage)
  useEffect(() => {
    // In a real app, you would load from storage here
    setFavorites([])
  }, [])

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: "/wisdom",
      params: {
        chapters: category.chapters.join(","),
        title: category.title,
      },
    })
  }

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#121212" : "#FFFBF0" }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Image
              source={require("@/assets/images/peacock-feather.jpeg")}
              style={styles.peacockFeather}
              resizeMode="contain"
            />
          </View>

          <Text style={[styles.title, { color: colorScheme === "dark" ? "#FFC107" : "#5D4037" }]}>
            Hey Parth, what's troubling your mind today?
          </Text>
          <Text style={[styles.subtitle, { color: colorScheme === "dark" ? "#E6D9B8" : "#8D6E63" }]}>
            Krishna holds timeless answers for your questions.
          </Text>

          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                emoji={category.emoji}
                description={category.description}
                onPress={() => handleCategoryPress(category)}
                colorScheme={colorScheme}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  peacockFeather: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 8,
    marginBottom: 24,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
})

