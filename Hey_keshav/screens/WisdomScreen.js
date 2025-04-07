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
} from "react-native"
import VerseCard from "../components/VerseCard"
import { fetchVerse, getChapterVerseCount } from "../api/gita"

const WisdomScreen = ({ route, navigation }) => {
  const { chapters, title } = route.params
  const [verses, setVerses] = useState([])
  const [loading, setLoading] = useState(true)
  const [verseIndices, setVerseIndices] = useState({})
  const [chapterLimits, setChapterLimits] = useState({})
  const [hasMoreVerses, setHasMoreVerses] = useState(true)

  // Initialize verse indices
  useEffect(() => {
    const initialIndices = {}
    chapters.forEach((chapter) => {
      initialIndices[chapter] = 1 // Start with verse 1 for each chapter
    })
    setVerseIndices(initialIndices)

    // Fetch chapter limits
    const fetchChapterLimits = async () => {
      const limits = {}
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Krishna Speaks</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.categoryTitle}>{title}</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {verses.map((verse, index) => (
          <VerseCard key={`${verse.chapter}-${verse.verse}-${index}`} verse={verse} />
        ))}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8D6E63" />
            <Text style={styles.loadingText}>Krishna is contemplating...</Text>
          </View>
        )}

        <View style={styles.buttonsContainer}>
          {hasMoreVerses && (
            <TouchableOpacity style={styles.moreWisdomButton} onPress={loadMoreWisdom} disabled={loading}>
              <Text style={styles.buttonText}>Show me more wisdom</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.backToCategoriesButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back to categories</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Image source={{ uri: "https://i.imgur.com/8UdKNS5.png" }} style={styles.krishnaImage} resizeMode="contain" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBF0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E6D9B8",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#8D6E63",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5D4037",
  },
  placeholder: {
    width: 40,
  },
  categoryTitle: {
    fontSize: 16,
    color: "#8D6E63",
    textAlign: "center",
    marginTop: 8,
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
    color: "#8D6E63",
    fontStyle: "italic",
  },
  buttonsContainer: {
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  moreWisdomButton: {
    backgroundColor: "#8D6E63",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  backToCategoriesButton: {
    backgroundColor: "#D7CCC8",
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
    width: 100,
    height: 100,
    opacity: 0.8,
  },
})

export default WisdomScreen

