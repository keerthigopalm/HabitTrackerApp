import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import COLORS from '../utils/colors';

type Habit = {
  id: string;
  name: string;
  frequency: 'Daily' | 'Weekly';
  completedDates: string[];
  streak: number;
  lastCompletedDate: string;
};

const HabitListScreen = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const today = new Date().toISOString().slice(0, 10);

  useFocusEffect(
    useCallback(() => {
      const loadHabits = async () => {
        const email = await AsyncStorage.getItem('loggedInEmail');
        if (!email) return;

        const key = `habits_${email}`;
        const stored = await AsyncStorage.getItem(key);
        const parsed = stored ? JSON.parse(stored) : [];
        setHabits(parsed);
      };
      loadHabits();
    }, [])
  );

  const markAsComplete = async (habitId: string) => {
    const email = await AsyncStorage.getItem('loggedInEmail');
    if (!email) return;

    const key = `habits_${email}`;
    const updated = habits.map(habit => {
      if (habit.id === habitId && !habit.completedDates.includes(today)) {
        return {
          ...habit,
          completedDates: [...habit.completedDates, today],
        };
      }
      return habit;
    });

    setHabits(updated);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
  };

  const deleteHabit = async (habitId: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this habit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const email = await AsyncStorage.getItem('loggedInEmail');
          if (!email) return;

          const key = `habits_${email}`;
          const updated = habits.filter(habit => habit.id !== habitId);
          setHabits(updated);
          await AsyncStorage.setItem(key, JSON.stringify(updated));
        },
      },
    ]);
  };

  const renderHabit = ({ item }: { item: Habit }) => {
    const isCompleted = item.completedDates.includes(today);
    return (
      <View style={styles.habitItem}>
        <Text style={styles.habitText}>{item.name}</Text>
        <Text style={{ color: isCompleted ? COLORS.success : COLORS.danger }}>
          {isCompleted ? 'Completed' : 'Not Completed'}
        </Text>

        <View style={styles.actionRow}>
          {!isCompleted && (
            <TouchableOpacity onPress={() => markAsComplete(item.id)} style={styles.button}>
              <Text style={styles.buttonText}>Mark Complete</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => deleteHabit(item.id)} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Habits for {today}</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
        ListEmptyComponent={<Text style={{ color: COLORS.textSecondary }}>No habits found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  habitItem: {
    backgroundColor: 'rgb(183, 160, 229)',
    borderColor: COLORS.accent,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 16,
  },
  habitText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HabitListScreen;
