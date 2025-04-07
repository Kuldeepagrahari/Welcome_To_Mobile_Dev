import React from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'

const MissionCard = ({ mission, vtolName }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <View style={[styles.card, styles[`priority_${mission.priority}`], styles[`status_${mission.status.replace('-', '_')}`]]}>
      <View style={styles.header}>
        <Text style={styles.type}>{mission.type}</Text>
        <Text style={styles.priority}>{mission.priority}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.route}>
          <Text style={styles.routeText}>
            <Text style={styles.bold}>From:</Text> {mission.origin.name}
          </Text>
          <Text style={styles.routeArrow}>→</Text>
          <Text style={styles.routeText}>
            <Text style={styles.bold}>To:</Text> {mission.destination.name}
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, styles[`status_${mission.status.replace('-', '_')}`]]}>
              {mission.status.replace('-', ' ')}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>VTOL:</Text>
            <Text style={styles.value}>{vtolName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>ETA:</Text>
            <Text style={styles.value}>{formatTime(mission.estimatedArrival)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.view]}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
        {mission.status === 'scheduled' && (
          <TouchableOpacity style={[styles.button, styles.start]}>
            <Text style={styles.buttonText}>Start Mission</Text>
          </TouchableOpacity>
        )}
        {mission.status === 'in-progress' && (
          <TouchableOpacity style={[styles.button, styles.complete]}>
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priority: {
    fontSize: 14,
    color: '#888',
  },
  body: {
    marginBottom: 12,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 6,
  },
  routeText: {
    fontSize: 14,
  },
  routeArrow: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  details: {
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  label: {
    fontWeight: '600',
    marginRight: 4,
  },
  value: {
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  view: {
    backgroundColor: '#30D5C8',
  },
  start: {
    backgroundColor: '#FFA500',
  },
  complete: {
    backgroundColor: '#28a745',
  },

  // Priority styles (you can adjust colors accordingly)
  priority_high: { borderLeftWidth: 4, borderLeftColor: '#FF4C4C' },
  priority_medium: { borderLeftWidth: 4, borderLeftColor: '#FFA500' },
  priority_low: { borderLeftWidth: 4, borderLeftColor: '#30D5C8' },

  // Status styles (also adjust colors if needed)
  status_scheduled: {},
  status_in_progress: {},
  status_completed: {},
})

export default MissionCard
