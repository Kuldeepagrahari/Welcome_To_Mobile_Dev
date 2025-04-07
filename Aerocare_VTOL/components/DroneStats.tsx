import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

interface DroneStatsProps {
  battery: number
  speed: number
  range: number
  wind: number
}

export default function DroneStats({ battery, speed, range, wind }: DroneStatsProps) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Feather name="battery" size={24} color="#30D5C8" />
          <Text style={styles.statLabel}>Battery</Text>
          <Text style={styles.statValue}>{battery}%</Text>
        </View>

        <View style={styles.statItem}>
          <Feather name="activity" size={24} color="#30D5C8" />
          <Text style={styles.statLabel}>Speed</Text>
          <Text style={styles.statValue}>{speed} km/h</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Feather name="globe" size={24} color="#30D5C8" />
          <Text style={styles.statLabel}>Range</Text>
          <Text style={styles.statValue}>{range} km</Text>
        </View>

        <View style={styles.statItem}>
          <Feather name="wind" size={24} color="#30D5C8" />
          <Text style={styles.statLabel}>Wind</Text>
          <Text style={styles.statValue}>{wind} km/h</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statsContainer: {
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statItem: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    fontFamily: "Inter-Regular",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
    fontFamily: "Inter-Bold",
  },
})

