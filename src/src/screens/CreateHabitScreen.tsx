import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../utils/colors';

type Habit = {
  id: string;
  name: string;
  frequency: 'Daily' | 'Weekly';
  completedDates: string[];
};

const CreateHabitScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly'>('Daily');

  const saveHabit = async () => {
    if (!name.trim()) {
      return Alert.alert('Please enter a habit name');
    }

    const email = await AsyncStorage.getItem('loggedInEmail');
    if (!email) {
      return Alert.alert('User session expired. Please log in again.');
    }

    const key = `habits_${email}`;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      frequency,
      completedDates: [],
    };

    const stored = await AsyncStorage.getItem(key);
    const habits: Habit[] = stored ? JSON.parse(stored) : [];

    const updatedHabits = [...habits, newHabit];
    await AsyncStorage.setItem(key, JSON.stringify(updatedHabits));

    Alert.alert('Habit added!');
    setName('');
    setFrequency('Daily');
    navigation.navigate('Main', { screen: 'Habits' }); // ✅ Return to Habit List
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Habit Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="e.g. Drink Water"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text style={styles.label}>Frequency</Text>
      <View style={styles.buttonRow}>
        <Button
          title="Daily"
          onPress={() => setFrequency('Daily')}
          color={frequency === 'Daily' ? COLORS.primary : 'gray'}
        />
        <Button
          title="Weekly"
          onPress={() => setFrequency('Weekly')}
          color={frequency === 'Weekly' ? COLORS.primary : 'gray'}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Save Habit" onPress={saveHabit} color={COLORS.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: COLORS.background, flex: 1 },
  label: { marginBottom: 5, fontWeight: 'bold', color: COLORS.textPrimary },
  input: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: COLORS.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default CreateHabitScreen;
