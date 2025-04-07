"use client"

import { useState, useEffect } from "react"
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useColorScheme,
  Alert,
  TouchableOpacity,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"


export default function FavoritesScreen() {
  const colorScheme = useColorScheme()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // In a real app, you would load favorites from storage here
    setFavorites([])
  }, [])

  const clearAllFavorites = () => {
    Alert.alert("Clear Favorites", "Are you sure you want to remove all favorite verses?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear All",
        onPress: () => {
          // In a real app, you would clear storage here
          setFavorites([])
        },
      },
    ])
  }

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#121212" : "#FFFBF0" }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colorScheme === "dark" ? "#FFC107" : "#5D4037" }]}>
            Your Favorite Verses
          </Text>

          {favorites.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearAllFavorites}>
              <Ionicons name="trash-outline" size={22} color={colorScheme === "dark" ? "#E57373" : "#D32F2F"} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {favorites.length > 0 ? (
            <Text style={styles.placeholderText}>Your favorite verses will appear here</Text>
          ) : (
            <View style={styles.emptyContainer}>
              <Image source={require("@/assets/images/empty-favorites.jpeg")} style={styles.emptyImage} resizeMode="contain" />

              <Text style={[styles.emptyText, { color: colorScheme === "dark" ? "#E6D9B8" : "#8D6E63" }]}>
                You haven't saved any verses yet.
              </Text>
              <Text style={[styles.emptySubtext, { color: colorScheme === "dark" ? "#BDBDBD" : "#9E9E9E" }]}>
                Tap the heart icon on any verse to add it to your favorites.
              </Text>
            </View>
          )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  clearButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 20,
    flex: 1,
  },
  placeholderText: {
    textAlign: "center",
    marginTop: 20,
    color: "#8D6E63",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 60,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.8,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
})

