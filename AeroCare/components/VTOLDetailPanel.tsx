import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

type VTOL = {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'offline' | string;
  batteryLevel: number;
  maxSpeed: number;
  range: number;
  currentMission?: string;
  location: {
    lat: number;
    lng: number;
  };
};

type Props = {
  vtol: VTOL;
};

const VTOLDetailPanel: React.FC<Props> = ({ vtol }) => {
  const getBatteryStyle = () => {
    if (vtol.batteryLevel < 20) return styles.batteryLow;
    if (vtol.batteryLevel < 50) return styles.batteryMedium;
    return styles.batteryHigh;
  };

  return (
    <ScrollView style={styles.panel}>
      <Text style={styles.title}>{vtol.name} Details</Text>

      {/* General Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Information</Text>
        <View style={styles.grid}>
          <DetailItem label="ID" value={vtol.id} />
          <DetailItem
            label="Status"
            value={vtol.status}
            valueStyle={[styles.status, statusColors[vtol.status] || styles.statusDefault]}
          />
          <View style={styles.detailItem}>
            <Text style={styles.label}>Battery:</Text>
            <View style={styles.batteryBar}>
              <View
                style={[styles.batteryFill, getBatteryStyle(), { width: `${vtol.batteryLevel}%` }]}
              />
            </View>
            <Text>{vtol.batteryLevel}%</Text>
          </View>
        </View>
      </View>

      {/* Performance Specs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Specifications</Text>
        <View style={styles.grid}>
          <DetailItem label="Max Speed" value={`${vtol.maxSpeed} km/h`} />
          <DetailItem label="Range" value={`${vtol.range} km`} />
        </View>
      </View>

      {/* Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Location</Text>
        <View style={styles.grid}>
          <DetailItem label="Latitude" value={vtol.location.lat.toFixed(6)} />
          <DetailItem label="Longitude" value={vtol.location.lng.toFixed(6)} />
        </View>
        <View style={styles.mapPlaceholder}>
          <Text style={{ fontWeight: 'bold' }}>Location Map</Text>
          <Text style={styles.smallText}>
            Lat: {vtol.location.lat.toFixed(6)}, Lng: {vtol.location.lng.toFixed(6)}
          </Text>
        </View>
      </View>

      {/* Mission */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mission Status</Text>
        {vtol.currentMission ? (
          <View>
            <Text style={styles.missionName}>{vtol.currentMission}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.noMissionText}>No active mission</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Assign New Mission</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.maintenanceBtn]}>
          <Text style={styles.buttonText}>Schedule Maintenance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.recallBtn]}>
          <Text style={styles.buttonText}>Recall VTOL</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VTOLDetailPanel;

const DetailItem = ({
  label,
  value,
  valueStyle,
}: {
  label: string;
  value: string;
  valueStyle?: any;
}) => (
  <View style={styles.detailItem}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  panel: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'column',
    gap: 8,
  },
  detailItem: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  statusDefault: {
    backgroundColor: '#aaa',
  },
  batteryBar: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 4,
  },
  batteryFill: {
    height: '100%',
    borderRadius: 5,
  },
  batteryLow: {
    backgroundColor: '#f44336',
  },
  batteryMedium: {
    backgroundColor: '#ff9800',
  },
  batteryHigh: {
    backgroundColor: '#4caf50',
  },
  mapPlaceholder: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  smallText: {
    fontSize: 12,
    color: '#666',
  },
  missionName: {
    fontWeight: '600',
    fontSize: 16,
  },
  noMissionText: {
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  maintenanceBtn: {
    backgroundColor: '#ffc107',
  },
  recallBtn: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

const statusColors: Record<string, any> = {
  active: { backgroundColor: '#4caf50' },
  idle: { backgroundColor: '#ff9800' },
  offline: { backgroundColor: '#f44336' },
};
