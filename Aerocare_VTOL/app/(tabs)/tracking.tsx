"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, ScrollView, Animated, Platform } from "react-native"
import { Feather } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps"

export default function TrackingScreen() {
  const [telemetry, setTelemetry] = useState({
    range: "0",
    battery: 91,
    temperature: 8,
    altitude: 0,
    horizontalSpeed: 0.0,
    verticalSpeed: 0.0,
    status: "In Transit", // 'Preparing', 'In Transit', 'Delivered'
  })

  const [position, setPosition] = useState({
    latitude: 25.4358,
    longitude: 81.8463,
  })

  const [destination, setDestination] = useState({
    latitude: 25.4358,
    longitude: 81.9463,
  })

  const [path, setPath] = useState([])

  const droneMarkerAnim = useRef(new Animated.Value(0)).current

  // Animate drone marker
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(droneMarkerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(droneMarkerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  // Simulate telemetry updates and drone movement
  useEffect(() => {
    const interval = setInterval(() => {
      // Update telemetry data
      setTelemetry((prev) => ({
        ...prev,
        range: (Number.parseFloat(prev.range) + 0.01).toFixed(2),
        altitude: prev.altitude < 50 ? prev.altitude + 1 : prev.altitude,
        horizontalSpeed: prev.horizontalSpeed < 5 ? prev.horizontalSpeed + 0.1 : prev.horizontalSpeed,
        verticalSpeed: prev.altitude < 50 ? 0.5 : 0,
        battery: prev.battery > 85 ? prev.battery - 0.1 : prev.battery,
      }))

      // Simulate drone movement towards destination
      setPosition((prev) => {
        const newLat = prev.latitude + (destination.latitude - prev.latitude) * 0.01
        const newLng = prev.longitude + (destination.longitude - prev.longitude) * 0.01

        const newPosition = {
          latitude: newLat,
          longitude: newLng,
        }

        // Add to path
        setPath((prevPath) => [...prevPath, newPosition])

        return newPosition
      })
    }, 1000)

    // Fetch real telemetry data if available
    const fetchTelemetry = async () => {
      try {
        const response = await fetch("https://vtol-server.onrender.com/api/telemetry")
        if (response.ok) {
          const data = await response.json()
          const configurations = data.configurations
          const latestTelemetry = data.latestTelemetry

          if (configurations && latestTelemetry) {
            const { horizontalSpeed, verticalSpeed, battery, currLatti, currLongi, currAltitude } = latestTelemetry
            const { sourceLatti, sourceLongi, destiLatti, destiLongi, temperature } = configurations

            setTelemetry({
              range: calculateDistance(currLatti || sourceLatti, currLongi || sourceLongi, destiLatti, destiLongi),
              battery: battery,
              temperature: temperature,
              altitude: currAltitude,
              horizontalSpeed: horizontalSpeed,
              verticalSpeed: verticalSpeed,
              status: "In Transit",
            })

            if (currLatti && currLongi) {
              setPosition({
                latitude: currLatti,
                longitude: currLongi,
              })
            }

            setDestination({
              latitude: destiLatti,
              longitude: destiLongi,
            })
          }
        }
      } catch (error) {
        console.error("Error fetching telemetry:", error)
      }
    }

    fetchTelemetry()

    return () => clearInterval(interval)
  }, [])

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180
    const R = 6371
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c).toFixed(2)
  }

  const droneScale = droneMarkerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  })

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Drone Live Tracking</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Origin marker */}
          <Marker
            coordinate={{
              latitude: path[0]?.latitude || position.latitude,
              longitude: path[0]?.longitude || position.longitude,
            }}
            pinColor="#4285F4"
            title="Origin"
          />

          {/* Destination marker */}
          <Marker coordinate={destination} pinColor="#FF9800" title="Destination" />

          {/* Drone path */}
          {path.length > 1 && <Polyline coordinates={path} strokeColor="#30D5C8" strokeWidth={3} />}

          {/* Drone marker */}
          <Marker coordinate={position} title="Drone">
            <Animated.View style={{ transform: [{ scale: droneScale }] }}>
              <View style={styles.droneMarker}>
                <Feather name="navigation-2" size={20} color="#fff" />
              </View>
            </Animated.View>
          </Marker>
        </MapView>
      </View>

      <ScrollView style={styles.telemetryContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.telemetryRow}>
          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryLabel}>Range</Text>
            <Text style={styles.telemetryValue}>{telemetry.range} km</Text>
          </View>

          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryLabel}>Battery</Text>
            <Text style={styles.telemetryValue}>{telemetry.battery.toFixed(0)}%</Text>
          </View>

          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryLabel}>Temperature</Text>
            <Text style={styles.telemetryValue}>{telemetry.temperature}°C</Text>
          </View>
        </View>

        <View style={styles.telemetryRow}>
          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryLabel}>Altitude</Text>
            <Text style={styles.telemetryValue}>{telemetry.altitude} m</Text>
          </View>

          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryLabel}>Horizontal Speed</Text>
            <Text style={styles.telemetryValue}>{telemetry.horizontalSpeed.toFixed(2)} m/s</Text>
          </View>
        </View>

        <View style={styles.telemetryRow}>
          <View style={styles.telemetryItem}>
            <Text style={styles.telemetryLabel}>Vertical Speed</Text>
            <Text style={styles.telemetryValue}>{telemetry.verticalSpeed.toFixed(2)} m/s</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Delivery Status</Text>

          <View style={styles.statusTracker}>
            <View style={styles.statusStep}>
              <View style={[styles.statusDot, styles.completedDot]} />
              <View style={[styles.statusLine, styles.completedLine]} />
              <Text style={styles.statusText}>Preparing</Text>
            </View>

            <View style={styles.statusStep}>
              <View style={[styles.statusDot, styles.activeDot]} />
              <View style={styles.statusLine} />
              <Text style={[styles.statusText, styles.activeStatusText]}>In Transit</Text>
            </View>

            <View style={styles.statusStep}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Delivered</Text>
            </View>
          </View>

          <View style={styles.estimatedTimeContainer}>
            <Feather name="clock" size={20} color="#30D5C8" />
            <Text style={styles.estimatedTimeText}>Estimated arrival in 15 minutes</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#30D5C8",
    fontFamily: "Inter-Bold",
  },
  mapContainer: {
    height: 300,
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  droneMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#30D5C8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  telemetryContainer: {
    flex: 1,
    padding: 15,
  },
  telemetryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  telemetryItem: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  telemetryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontFamily: "Inter-Regular",
  },
  telemetryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Inter-Bold",
  },
  statusContainer: {
    padding: 15,
    marginTop: 10,
    marginBottom: 80,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Inter-Bold",
  },
  statusTracker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    position: "relative",
  },
  statusStep: {
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ddd",
    marginBottom: 8,
  },
  completedDot: {
    backgroundColor: "#30D5C8",
  },
  activeDot: {
    backgroundColor: "#30D5C8",
    borderWidth: 4,
    borderColor: "rgba(48, 213, 200, 0.3)",
    width: 24,
    height: 24,
  },
  statusLine: {
    position: "absolute",
    top: 10,
    left: "50%",
    width: "100%",
    height: 2,
    backgroundColor: "#ddd",
    zIndex: -1,
  },
  completedLine: {
    backgroundColor: "#30D5C8",
  },
  statusText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Inter-Regular",
  },
  activeStatusText: {
    color: "#30D5C8",
    fontWeight: "bold",
    fontFamily: "Inter-Medium",
  },
  estimatedTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
  },
  estimatedTimeText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "Inter-Regular",
  },
})

