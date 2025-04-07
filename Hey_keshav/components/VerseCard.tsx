"use client"

import type React from "react"
import { useEffect } from "react"
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

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

interface VerseCardProps {
  verse: Verse
  isFavorite: boolean
  onToggleFavorite: () => void
  colorScheme?: string
}

const VerseCard: React.FC<VerseCardProps> = ({ verse, isFavorite, onToggleFavorite, colorScheme }) => {
  const fadeAnim = new Animated.Value(0)
  const isDark = colorScheme === "dark"

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [verse])

  if (!verse) {
    return null
  }

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          backgroundColor: isDark ? "rgba(30, 30, 30, 0.8)" : "#FFF8E1",
          borderColor: isDark ? "#333333" : "#E6D9B8",
        },
      ]}
    >
      <View style={styles.verseHeader}>
        <Text style={[styles.chapterVerse, { color: isDark ? "#E6D9B8" : "#8D6E63" }]}>
          Chapter {verse.chapter} · Verse {verse.verse}
        </Text>

        <TouchableOpacity onPress={onToggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite ? "#FF5252" : isDark ? "#E6D9B8" : "#8D6E63"}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.sanskrit, { color: isDark ? "#FFC107" : "#5D4037" }]}>{verse.slok}</Text>

      <View style={[styles.divider, { backgroundColor: isDark ? "#333333" : "#E6D9B8" }]} />

      <Text style={[styles.translation, { color: isDark ? "#FFFFFF" : "#5D4037" }]}>
        {verse.tej?.ht || verse.translation}
      </Text>

      {verse.purohit && (
        <View style={styles.commentaryContainer}>
          <Text style={[styles.commentaryTitle, { color: isDark ? "#E6D9B8" : "#8D6E63" }]}>Commentary:</Text>
          <Text style={[styles.commentary, { color: isDark ? "#BDBDBD" : "#8D6E63" }]}>{verse.purohit}</Text>
        </View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  verseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  chapterVerse: {
    fontSize: 14,
    fontWeight: "500",
  },
  sanskrit: {
    fontSize: 16,
    marginBottom: 12,
    fontStyle: "italic",
    lineHeight: 24,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  translation: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  commentaryContainer: {
    marginTop: 8,
  },
  commentaryTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  commentary: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
})

export default VerseCard

