"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native"
import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import DroneStats from "../../components/DroneStats"
import BottomNavigation from "../../components/BottomNavigation"

export default function DroneDetailsScreen() {
  const [drone] = useState({
    id: "Syma W2",
    name: "Protective Drone",
    description: "Scratch your protective drone to deliver Vaccines in minimum Cost and higher Speed",
    model: "Aviator Pro",
    battery: 98,
    speed: 46,
    range: 50,
    wind: 15,
  })

  const handleScheduleRide = () => {
    router.push("/location")
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.droneName}>{drone.id}</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.droneTitle}>
          <Text style={styles.droneTitleText}>{drone.name}</Text>
          <Text style={styles.droneDescription}>{drone.description}</Text>
        </View>

        <View style={styles.droneImageContainer}>
          <Image source={require("../../assets/drone-model.png")} style={styles.droneImage} resizeMode="contain" />
          <Text style={styles.droneModel}>{drone.model}</Text>
        </View>

        <View style={styles.batteryContainer}>
          <Text style={styles.batteryLabel}>Battery</Text>
          <View style={styles.batteryBar}>
            <View style={[styles.batteryLevel, { width: `${drone.battery}%` }]} />
            <Text style={styles.batteryPercentage}>{drone.battery}%</Text>
          </View>
        </View>

        <DroneStats battery={drone.battery} speed={drone.speed} range={drone.range} wind={drone.wind} />

        <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleRide}>
          <Text style={styles.scheduleButtonText}>Schedule a Ride</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation active="home" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 5,
  },
  droneName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
  menuButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  droneTitle: {
    marginBottom: 20,
  },
  droneTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    fontFamily: "Inter-Bold",
  },
  droneDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    fontFamily: "Inter-Regular",
  },
  droneImageContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  droneImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  droneModel: {
    fontSize: 16,
    color: "#30D5C8",
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  batteryContainer: {
    marginBottom: 20,
  },
  batteryLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontFamily: "Inter-Medium",
  },
  batteryBar: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },
  batteryLevel: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    backgroundColor: "#30D5C8",
    borderRadius: 5,
  },
  batteryPercentage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    lineHeight: 10,
    fontSize: 8,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Inter-Bold",
  },
  scheduleButton: {
    backgroundColor: "#30D5C8",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 80,
  },
  scheduleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter-Medium",
  },
})

