"use client"

import { useEffect } from "react"
import { View, Image, StyleSheet, Text } from "react-native"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function SplashScreen() {
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      router.replace("/auth/login")
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require("@/assets/drone-logo.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>AeroCare</Text>
      <Text style={styles.subtitle}>Swift. Safe. Life-Saving Deliveries</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#30D5C8",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
    fontFamily: "Inter-Regular",
  },
})

