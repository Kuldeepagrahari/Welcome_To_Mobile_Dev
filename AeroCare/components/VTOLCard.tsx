import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

type VTOL = {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'offline' | string;
  batteryLevel: number;
  maxSpeed: number;
  range: number;
  currentMission?: string;
};

type Props = {
  vtol: VTOL;
  isSelected: boolean;
  onSelect: () => void;
};

const VTOLCard: React.FC<Props> = ({ vtol, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.card,
        statusColors[vtol.status] || styles.defaultStatus,
        isSelected && styles.selected
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{vtol.name}</Text>
        <Text style={[styles.statusIndicator, statusColors[vtol.status] || styles.defaultStatus]}>
          {vtol.status}
        </Text>
      </View>

      <View style={styles.battery}>
        <View style={styles.batteryBar}>
          <View style={[styles.batteryLevel, { width: `${vtol.batteryLevel}%` }]} />
        </View>
        <Text style={styles.batteryText}>{vtol.batteryLevel}%</Text>
      </View>

      <View style={styles.details}>
        <Text><Text style={styles.bold}>ID:</Text> {vtol.id}</Text>
        <Text><Text style={styles.bold}>Max Speed:</Text> {vtol.maxSpeed} km/h</Text>
        <Text><Text style={styles.bold}>Range:</Text> {vtol.range} km</Text>
      </View>

      <View>
        {vtol.currentMission ? (
          <Text><Text style={styles.bold}>Mission:</Text> {vtol.currentMission}</Text>
        ) : (
          <Text style={styles.noMission}>No active mission</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default VTOLCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#007bff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusIndicator: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    color: '#fff',
    overflow: 'hidden',
  },
  battery: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  batteryBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginRight: 8,
    overflow: 'hidden',
  },
  batteryLevel: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  batteryText: {
    fontSize: 14,
  },
  details: {
    marginBottom: 8,
  },
  bold: {
    fontWeight: '600',
  },
  noMission: {
    color: '#999',
    fontStyle: 'italic',
  },
  defaultStatus: {
    backgroundColor: '#ccc',
  }
});

const statusColors: Record<string, ViewStyle> = {
  active: { backgroundColor: '#4caf50' },
  idle: { backgroundColor: '#ff9800' },
  offline: { backgroundColor: '#f44336' },
};
