import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Polyline, Circle } from "react-native-svg";

const DroneStats = ({ battery, speed, range, wind }:any) => {
  const stats = [
    {
      label: "Battery",
      value: battery,
      unit: "%",
      icon: (
        <Svg width="24" height="24" stroke="black" strokeWidth="2" fill="none">
          <Path d="M7 7h10v10H7z" />
          <Path d="M7 3v4h10V3" />
          <Path d="M7 21v-4h10v4" />
        </Svg>
      ),
    },
    {
      label: "Speed",
      value: speed,
      unit: "km/h",
      icon: (
        <Svg width="24" height="24" stroke="black" strokeWidth="2" fill="none">
          <Polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </Svg>
      ),
    },
    {
      label: "Range",
      value: range,
      unit: "km",
      icon: (
        <Svg width="24" height="24" stroke="black" strokeWidth="2" fill="none">
          <Circle cx="12" cy="12" r="10" />
          <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <Path d="M2 12h20" />
        </Svg>
      ),
    },
    {
      label: "Wind",
      value: wind,
      unit: "km/h",
      icon: (
        <Svg width="24" height="24" stroke="black" strokeWidth="2" fill="none">
          <Path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
        </Svg>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map(({ label, value, unit, icon }, index) => (
        <View key={index} style={styles.statItem}>
          <View style={styles.icon}>{icon}</View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>
            {value}
            <Text style={styles.unit}> {unit}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    margin: 10,
  },
  statItem: {
    alignItems: "center",
    marginBottom: 16,
    width: "40%",
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  unit: {
    fontSize: 12,
    color: "#999",
  },
});

export default DroneStats;
