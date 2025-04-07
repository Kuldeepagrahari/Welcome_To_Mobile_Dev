"use client"

import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native"
import { router, usePathname } from "expo-router"
import { Feather } from "@expo/vector-icons"

interface BottomNavigationProps {
  active?: "home" | "order" | "tracking" | "command"
}

export default function BottomNavigation({ active = "home" }: BottomNavigationProps) {
  const pathname = usePathname()

  // If active prop is not provided, try to determine from pathname
  const determineActive = () => {
    if (active !== "home") return active

    if (pathname.includes("/tracking")) return "tracking"
    if (pathname.includes("/command")) return "command"
    if (pathname.includes("/order")) return "order"
    return "home"
  }

  const activeTab = determineActive()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/home")}>
        <Feather name="home" size={24} color={activeTab === "home" ? "#30D5C8" : "#999"} />
        <Text style={[styles.navText, activeTab === "home" && styles.activeNavText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/order")}>
        <Feather name="activity" size={24} color={activeTab === "order" ? "#30D5C8" : "#999"} />
        <Text style={[styles.navText, activeTab === "order" && styles.activeNavText]}>Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/tracking")}>
        <Feather name="map-pin" size={24} color={activeTab === "tracking" ? "#30D5C8" : "#999"} />
        <Text style={[styles.navText, activeTab === "tracking" && styles.activeNavText]}>Track</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(tabs)/command")}>
        <Feather name="user" size={24} color={activeTab === "command" ? "#30D5C8" : "#999"} />
        <Text style={[styles.navText, activeTab === "command" && styles.activeNavText]}>Command</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === "ios" ? 25 : 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: "#999",
    fontFamily: "Inter-Regular",
  },
  activeNavText: {
    color: "#30D5C8",
    fontFamily: "Inter-Medium",
  },
})

