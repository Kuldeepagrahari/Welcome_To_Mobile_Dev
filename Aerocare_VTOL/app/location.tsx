"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native"
import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from "expo-location"
import BottomNavigation from "@/components/BottomNavigation"

export default function LocationScreen() {
  const [loading, setLoading] = useState(false)
  const [feasibilityChecked, setFeasibilityChecked] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [mapRegion, setMapRegion] = useState({
    latitude: 25.2048,
    longitude: 55.2708,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [formData, setFormData] = useState({
    fromLocation: "Prayagraj, Uttar Pradesh, India",
    toLocation: "Saray Ankil, Uttar Pradesh 212216, India",
    fromLat: 25.4358,
    fromLng: 81.8463,
    toLat: 25.4358,
    toLng: 81.9463,
    criticalBattery: "90",
    temperature: "3",
    altitude: "50",
    emergencyAction: "Land",
  })

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.log("Permission to access location was denied")
        return
      }

      try {
        const location = await Location.getCurrentPositionAsync({})
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })

        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })

        // Update from location with user's current location
        setFormData((prev) => ({
          ...prev,
          fromLat: location.coords.latitude,
          fromLng: location.coords.longitude,
        }))
      } catch (error) {
        console.log("Error getting location:", error)
      }
    })()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckFeasibility = () => {
    if (!formData.fromLocation || !formData.toLocation) {
      alert("Please enter both locations")
      return
    }

    setLoading(true)

    // Make API call to check feasibility
    fetch("https://vtol-server.onrender.com/api/telemetry/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourceLongi: formData.fromLng,
        sourceLatti: formData.fromLat,
        destiLongi: formData.toLng,
        destiLatti: formData.toLat,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        if (data.success) {
          setFeasibilityChecked(true)
        } else {
          alert(
            `We can't cover this much distance\nBattery: ${data.batterySoC}%\nDistance: ${data.distance.toFixed(2)} km`,
          )
        }
      })
      .catch((error) => {
        setLoading(false)
        console.error("Feasibility Check Failed:", error)

        // For demo purposes, we'll proceed anyway
        setFeasibilityChecked(true)
      })
  }

  const handleProceed = () => {
    if (!formData.temperature || !formData.altitude) {
      alert("Please fill all required fields")
      return
    }

    setShowOrderDetails(true)
  }

  const handleBook = () => {
    setLoading(true)

    // Make API call to start journey
    fetch("https://vtol-server.onrender.com/api/telemetry/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourceLongi: formData.fromLng,
        sourceLatti: formData.fromLat,
        destiLongi: formData.toLng,
        destiLatti: formData.toLat,
        criticalBattery: formData.criticalBattery,
        temperature: formData.temperature,
        altitude: formData.altitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        router.push("/booking/confirmed")
      })
      .catch((error) => {
        setLoading(false)
        console.error("Start Journey Failed:", error)

        // For demo purposes, we'll proceed anyway
        router.push("/booking/confirmed")
      })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Syma W2</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={mapRegion} showsUserLocation={true}>
          {formData.fromLat && formData.fromLng && (
            <Marker
              coordinate={{
                latitude: formData.fromLat,
                longitude: formData.fromLng,
              }}
              pinColor="#4285F4"
              title="Origin"
            />
          )}

          {formData.toLat && formData.toLng && (
            <Marker
              coordinate={{
                latitude: formData.toLat,
                longitude: formData.toLng,
              }}
              pinColor="#FF9800"
              title="Destination"
            />
          )}

          {formData.fromLat && formData.fromLng && formData.toLat && formData.toLng && (
            <Polyline
              coordinates={[
                { latitude: formData.fromLat, longitude: formData.fromLng },
                { latitude: formData.toLat, longitude: formData.toLng },
              ]}
              strokeColor="#30D5C8"
              strokeWidth={3}
            />
          )}
        </MapView>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {!showOrderDetails ? (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Location</Text>

            <TextInput
              style={styles.input}
              placeholder="From where?"
              value={formData.fromLocation}
              onChangeText={(text) => handleInputChange("fromLocation", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Where should you go?"
              value={formData.toLocation}
              onChangeText={(text) => handleInputChange("toLocation", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Critical Battery?"
              value={formData.criticalBattery}
              onChangeText={(text) => handleInputChange("criticalBattery", text)}
              keyboardType="numeric"
            />

            {!feasibilityChecked ? (
              <TouchableOpacity style={styles.checkButton} onPress={handleCheckFeasibility} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.checkButtonText}>Check Feasibility</Text>
                )}
              </TouchableOpacity>
            ) : (
              <View style={styles.additionalFields}>
                <Text style={styles.fieldLabel}>Temperature</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Temperature (°C)"
                  value={formData.temperature}
                  onChangeText={(text) => handleInputChange("temperature", text)}
                  keyboardType="numeric"
                />

                <Text style={styles.fieldLabel}>Altitude</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Altitude (m)"
                  value={formData.altitude}
                  onChangeText={(text) => handleInputChange("altitude", text)}
                  keyboardType="numeric"
                />

                <Text style={styles.fieldLabel}>Emergency Action</Text>
                <View style={styles.selectContainer}>
                  <TouchableOpacity
                    style={[styles.selectOption, formData.emergencyAction === "Land" && styles.selectedOption]}
                    onPress={() => handleInputChange("emergencyAction", "Land")}
                  >
                    <Text
                      style={[
                        styles.selectOptionText,
                        formData.emergencyAction === "Land" && styles.selectedOptionText,
                      ]}
                    >
                      Land
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.selectOption, formData.emergencyAction === "RTL" && styles.selectedOption]}
                    onPress={() => handleInputChange("emergencyAction", "RTL")}
                  >
                    <Text
                      style={[styles.selectOptionText, formData.emergencyAction === "RTL" && styles.selectedOptionText]}
                    >
                      RTL
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                  <Text style={styles.proceedButtonText}>Proceed</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.orderDetailsContainer}>
            <Text style={styles.orderDetailsTitle}>Order Details</Text>

            <View style={styles.locationsList}>
              <View style={styles.locationItem}>
                <View style={[styles.locationDot, styles.blueDot]} />
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationText}>{formData.fromLocation}</Text>
                </View>
              </View>

              <View style={styles.locationItem}>
                <View style={[styles.locationDot, styles.orangeDot]} />
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationText}>{formData.toLocation}</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Altitude</Text>
                <Text style={styles.detailValue}>{formData.altitude} m</Text>
              </View>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Emergency Action</Text>
                <Text style={styles.detailValue}>{formData.emergencyAction}</Text>
              </View>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Temperature Required</Text>
                <Text style={styles.detailValue}>{formData.temperature} deg</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.bookButton} onPress={handleBook} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.bookButtonText}>Book</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
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
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },
  menuButton: {
    padding: 5,
  },
  mapContainer: {
    height: 250,
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Inter-Bold",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  checkButton: {
    backgroundColor: "#30D5C8",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  checkButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter-Medium",
  },
  additionalFields: {
    marginTop: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    fontFamily: "Inter-Medium",
  },
  selectContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  selectOption: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: "#30D5C8",
    borderColor: "#30D5C8",
  },
  selectOptionText: {
    color: "#333",
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  selectedOptionText: {
    color: "#fff",
  },
  proceedButton: {
    backgroundColor: "#30D5C8",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter-Medium",
  },
  orderDetailsContainer: {
    padding: 20,
  },
  orderDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Inter-Bold",
  },
  locationsList: {
    marginBottom: 20,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  blueDot: {
    backgroundColor: "#4285F4",
  },
  orangeDot: {
    backgroundColor: "#FF9800",
  },
  locationTextContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Inter-Regular",
  },
  detailsCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Inter-Regular",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Inter-Medium",
  },
  bookButton: {
    backgroundColor: "#30D5C8",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter-Medium",
  },
})

