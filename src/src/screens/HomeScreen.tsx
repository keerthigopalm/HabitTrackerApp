import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../utils/colors';

const HomeScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getEmail = async () => {
      const loggedInEmail = await AsyncStorage.getItem('loggedInEmail');
      if (loggedInEmail) setEmail(loggedInEmail);
    };
    getEmail();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome,</Text>
      <Text style={styles.email}>{email}</Text>

      <View style={styles.buttonGroup}>
        <Button title="View Habits" onPress={() => navigation.navigate('Habits')} color={COLORS.primary} />
        <Button title="Create Habit" onPress={() => navigation.navigate('Create')} color={COLORS.primary} />
        <Button title="Progress" onPress={() => navigation.navigate('Progress')} color={COLORS.primary} />
        <Button title="Logout" onPress={() => navigation.navigate('Logout')} color={COLORS.danger} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
    color: COLORS.textSecondary,
  },
  buttonGroup: {
    width: '100%',
    gap: 15,
  },
});

export default HomeScreen;
