"use client"

import { Tabs } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as SplashScreen from "expo-splash-screen"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function AppLayout() {
  const colorScheme = useColorScheme()
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  useEffect(() => {
    // Hide splash screen after initialization
    SplashScreen.hideAsync()
  }, [])

  const toggleMusic = () => {
    // In a real app, this would control actual music playback
    setIsMusicPlaying(!isMusicPlaying)
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF9800",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#8D6E63" : "#8D6E63",
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#FFF8E1",
          borderTopColor: colorScheme === "dark" ? "#333333" : "#E6D9B8",
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#FFF8E1",
          borderBottomColor: colorScheme === "dark" ? "#333333" : "#E6D9B8",
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: colorScheme === "dark" ? "#FFFFFF" : "#5D4037",
        },
        headerRight: () => (
          <TouchableOpacity style={styles.audioButton} onPress={toggleMusic}>
            <Ionicons
              name={isMusicPlaying ? "volume-high" : "volume-mute"}
              size={24}
              color={colorScheme === "dark" ? "#FFFFFF" : "#5D4037"}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ask Krishna",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }:any) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wisdom"
        options={{
          title: "Krishna's Wisdom",
          tabBarLabel: "Wisdom",
          tabBarIcon: ({ color, size }:any) => <Ionicons name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorite Verses",
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }: any) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }:any) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  audioButton: {
    marginRight: 16,
    padding: 8,
  },
})

