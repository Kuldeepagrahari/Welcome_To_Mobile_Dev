import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"

export default function OrderScreen() {
  const handleBook = () => {
    router.push("/booking/confirmed")
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Syma W2</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="more-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.map}>
          <View style={styles.routeMarkerOrigin} />
          <View style={styles.routePath} />
          <View style={styles.routeMarkerDestination} />
          <View style={styles.droneMarker} />
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Order Details</Text>

        <View style={styles.locationsContainer}>
          <View style={styles.locationItem}>
            <View style={[styles.locationDot, styles.blueDot]} />
            <View style={styles.locationDetails}>
              <Text style={styles.locationName}>Sand Houses 1234 Street No: 12</Text>
            </View>
          </View>

          <View style={styles.locationItem}>
            <View style={[styles.locationDot, styles.orangeDot]} />
            <View style={styles.locationDetails}>
              <Text style={styles.locationName}>Sun Houses 4321 Street No:9</Text>
            </View>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Time</Text>
          <Text style={styles.timeValue}>12:30 pm</Text>
          <Text style={styles.dateValue}>Today Apr, 30</Text>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
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
    height: 300,
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  map: {
    flex: 1,
    position: "relative",
  },
  routeMarkerOrigin: {
    position: "absolute",
    top: "30%",
    left: "20%",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4285F4",
  },
  routePath: {
    position: "absolute",
    top: "35%",
    left: "25%",
    width: "50%",
    height: 3,
    backgroundColor: "#30D5C8",
    transform: [{ rotate: "15deg" }],
  },
  routeMarkerDestination: {
    position: "absolute",
    top: "40%",
    right: "20%",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF9800",
  },
  droneMarker: {
    position: "absolute",
    top: "33%",
    left: "40%",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#30D5C8",
    borderWidth: 3,
    borderColor: "#fff",
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Inter-Bold",
  },
  locationsContainer: {
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
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Inter-Regular",
  },
  timeContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  timeLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontFamily: "Inter-Regular",
  },
  timeValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Inter-Bold",
  },
  dateValue: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    fontFamily: "Inter-Regular",
  },
  bookButton: {
    backgroundColor: "#30D5C8",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Inter-Medium",
  },
})

