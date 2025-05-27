import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../utils/colors';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const ProgressScreen = () => {
  const [percentComplete, setPercentComplete] = useState(0);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const today = new Date().toISOString().slice(0, 10);

  useFocusEffect(
    useCallback(() => {
      const calcProgress = async () => {
        const email = await AsyncStorage.getItem('loggedInEmail');
        if (!email) return;

        const key = `habits_${email}`;
        const stored = await AsyncStorage.getItem(key);
        if (!stored) return;

        const habits = JSON.parse(stored);
        const totalHabits = habits.length;
        const completedToday = habits.filter((h: any) =>
          h.completedDates.includes(today)
        ).length;

        const percent = totalHabits > 0
          ? Math.round((completedToday / totalHabits) * 100)
          : 0;

        setTotal(totalHabits);
        setCompleted(completedToday);
        setPercentComplete(percent);
      };

      calcProgress();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Progress Today</Text>
      <Text style={styles.percent}>{percentComplete}% Complete</Text>
      <Text style={styles.sub}>({completed}/{total} habits completed)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  percent: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },
  sub: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
});

export default ProgressScreen;
