"use client"

import { useState, useEffect } from "react"
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  useColorScheme,
} from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import VerseCard from "../components/VerseCard"
import { fetchVerse, getChapterVerseCount } from "../api/gita"

// Define verse type
interface Verse {
  chapter: number
  verse: number
  slok: string
  translation: string
  tej?: {
    ht: string
  }
  purohit?: string
}

export default function WisdomScreen() {
  const params = useLocalSearchParams()
  const colorScheme = useColorScheme()
  const chapters = params.chapters ? params.chapters.toString().split(",").map(Number) : []
  const title = params.title?.toString() || "Krishna's Wisdom"

  const [verses, setVerses] = useState<Verse[]>([])
  const [loading, setLoading] = useState(true)
  const [verseIndices, setVerseIndices] = useState<Record<number, number>>({})
  const [chapterLimits, setChapterLimits] = useState<Record<number, number>>({})
  const [hasMoreVerses, setHasMoreVerses] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])

  // Initialize verse indices
  useEffect(() => {
    const initialIndices: Record<number, number> = {}
    chapters.forEach((chapter) => {
      initialIndices[chapter] = 1 // Start with verse 1 for each chapter
    })
    setVerseIndices(initialIndices)

    // Fetch chapter limits
    const fetchChapterLimits = async () => {
      const limits: Record<number, number> = {}
      for (const chapter of chapters) {
        const count = await getChapterVerseCount(chapter)
        limits[chapter] = count
      }
      setChapterLimits(limits)
    }

    fetchChapterLimits()
  }, [chapters])

  // Fetch verses when indices change
  useEffect(() => {
    if (Object.keys(verseIndices).length === 0) return

    const fetchVerses = async () => {
      setLoading(true)
      try {
        const versePromises = chapters.map((chapter) => fetchVerse(chapter, verseIndices[chapter]))

        const fetchedVerses = await Promise.all(versePromises)
        setVerses((prevVerses) => [...prevVerses, ...fetchedVerses])
      } catch (error) {
        console.error("Error fetching verses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVerses()
  }, [verseIndices])

  const loadMoreWisdom = () => {
    // Check if we've reached the limit for all chapters
    let canLoadMore = false

    const newIndices = { ...verseIndices }
    chapters.forEach((chapter) => {
      if (verseIndices[chapter] < chapterLimits[chapter]) {
        newIndices[chapter] = verseIndices[chapter] + 1
        canLoadMore = true
      }
    })

    if (canLoadMore) {
      setVerseIndices(newIndices)
    } else {
      setHasMoreVerses(false)
    }
  }

  const toggleFavorite = (verse: Verse) => {
    const verseId = `${verse.chapter}-${verse.verse}`

    // In a real app, you would save to storage here
    if (favorites.includes(verseId)) {
      setFavorites(favorites.filter((id) => id !== verseId))
    } else {
      setFavorites([...favorites, verseId])
    }
  }

  const isFavorite = (verse: Verse): boolean => {
    return favorites.includes(`${verse.chapter}-${verse.verse}`)
  }

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#121212" : "#FFFBF0" }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <SafeAreaView style={styles.safeArea}>
        <Text style={[styles.categoryTitle, { color: colorScheme === "dark" ? "#FFC107" : "#8D6E63" }]}>{title}</Text>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {verses.map((verse, index) => (
            <VerseCard
              key={`${verse.chapter}-${verse.verse}-${index}`}
              verse={verse}
              isFavorite={isFavorite(verse)}
              onToggleFavorite={() => toggleFavorite(verse)}
              colorScheme={colorScheme}
            />
          ))}

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colorScheme === "dark" ? "#FFC107" : "#8D6E63"} />
              <Text style={[styles.loadingText, { color: colorScheme === "dark" ? "#E6D9B8" : "#8D6E63" }]}>
                Krishna is contemplating...
              </Text>
            </View>
          )}

          <View style={styles.buttonsContainer}>
            {hasMoreVerses && (
              <TouchableOpacity
                style={[styles.moreWisdomButton, { backgroundColor: colorScheme === "dark" ? "#FF9800" : "#8D6E63" }]}
                onPress={loadMoreWisdom}
                disabled={loading}
              >
                <Text style={styles.buttonText}>Show me more wisdom</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.backToCategoriesButton,
                { backgroundColor: colorScheme === "dark" ? "#333333" : "#D7CCC8" },
              ]}
              onPress={() => router.back()}
            >
              <Text style={[styles.buttonText, { color: colorScheme === "dark" ? "#FFFFFF" : "#5D4037" }]}>
                Back to categories
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Image source={require("@/assets/images/krishna-chariot.jpeg")} style={styles.krishnaImage} resizeMode="contain" />
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
  categoryTitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 16,
    fontStyle: "italic",
  },
  scrollContent: {
    paddingBottom: 100, // Extra space for the Krishna image
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontStyle: "italic",
  },
  buttonsContainer: {
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  moreWisdomButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  backToCategoriesButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  krishnaImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 150,
    height: 150,
    opacity: 0.9,
  },
})

