import React from "react"
import { StyleSheet, View } from "react-native"
import MapView, { Marker, Polyline } from "react-native-maps"

type Location = {
  lat: number
  lng: number
}

type VTOLCraft = {
  name: string
  location: Location
  status: "active" | "maintenance" | "standby"
  batteryLevel: number
  currentMission?: string
}

type Mission = {
  origin: Location
  destination: Location
  status: "pending" | "in-progress" | "completed"
  priority: "critical" | "high" | "normal"
}

type Props = {
  vtolCrafts: VTOLCraft[]
  missions: Mission[]
}

const getMarkerColor = (status: VTOLCraft["status"]) => {
  switch (status) {
    case "active":
      return "green"
    case "maintenance":
      return "orange"
    case "standby":
      return "blue"
    default:
      return "gray"
  }
}

const getPathColor = (priority: Mission["priority"]) => {
  switch (priority) {
    case "critical":
      return "red"
    case "high":
      return "orange"
    case "normal":
      return "green"
    default:
      return "gray"
  }
}

const VTOLMap: React.FC<Props> = ({ vtolCrafts, missions }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {vtolCrafts.map((vtol, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: vtol.location.lat,
              longitude: vtol.location.lng,
            }}
            title={vtol.name}
            description={`Status: ${vtol.status}, Battery: ${vtol.batteryLevel}%`}
            pinColor={getMarkerColor(vtol.status)}
          />
        ))}

        {missions
          .filter((m) => m.status === "in-progress")
          .map((mission, index) => (
            <Polyline
              key={`path-${index}`}
              coordinates={[
                {
                  latitude: mission.origin.lat,
                  longitude: mission.origin.lng,
                },
                {
                  latitude: mission.destination.lat,
                  longitude: mission.destination.lng,
                },
              ]}
              strokeColor={getPathColor(mission.priority)}
              strokeWidth={3}
            />
          ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
})

export default VTOLMap
