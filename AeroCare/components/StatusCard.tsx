import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type StatusCardProps = {
  title: string;
  value: string | number;
  color?: 'blue' | 'green' | 'red' | 'orange' | 'gray';
};

const StatusCard: React.FC<StatusCardProps> = ({ title, value, color = 'blue' }) => {
  return (
    <View style={[styles.card, colorStyles[color]]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default StatusCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '500',
  },
  value: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
  },
});

const colorStyles: Record<string, ViewStyle> = {
  blue: { backgroundColor: '#4e8cff' },
  green: { backgroundColor: '#34c759' },
  red: { backgroundColor: '#ff3b30' },
  orange: { backgroundColor: '#ff9500' },
  gray: { backgroundColor: '#8e8e93' },
};
