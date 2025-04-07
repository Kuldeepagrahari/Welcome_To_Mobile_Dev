import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface MissionFormData {
  missionTitle: string;
  missionDescription: string;
  startDate: Date;
  endDate: Date;
  priority: string;
}

interface MissionFormProps {
  onSubmit?: (data: MissionFormData) => void;
}

const MissionForm: React.FC<MissionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<MissionFormData>({
    missionTitle: '',
    missionDescription: '',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'Medium',
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleInputChange = (key: keyof MissionFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Mission</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Mission Title"
        value={formData.missionTitle}
        onChangeText={(text) => handleInputChange('missionTitle', text)}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Mission Description"
        multiline
        value={formData.missionDescription}
        onChangeText={(text) => handleInputChange('missionDescription', text)}
      />

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity
        onPress={() => setShowStartPicker(true)}
        style={styles.dateButton}
      >
        <Text>{formData.startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={formData.startDate}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowStartPicker(false);
            if (date) handleInputChange('startDate', date);
          }}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity
        onPress={() => setShowEndPicker(true)}
        style={styles.dateButton}
      >
        <Text>{formData.endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={formData.endDate}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowEndPicker(false);
            if (date) handleInputChange('endDate', date);
          }}
        />
      )}

      <Text style={styles.label}>Priority</Text>
      <TextInput
        style={styles.input}
        placeholder="Low / Medium / High"
        value={formData.priority}
        onChangeText={(text) => handleInputChange('priority', text)}
      />

      <Button title="Submit Mission" onPress={handleSubmit} />
    </View>
  );
};

export default MissionForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    gap: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
});
