import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../utils/colors';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const usersData = await AsyncStorage.getItem('users');
    if (!usersData) return Alert.alert('No registered users');

    const users = JSON.parse(usersData);
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      await AsyncStorage.setItem('loggedIn', 'true');
      await AsyncStorage.setItem('loggedInEmail', email);
      navigation.replace('Main');
    } else {
      Alert.alert('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={login} color={COLORS.primary} />
      <Text
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate('Register')}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: COLORS.background, flex: 1 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 6,
    backgroundColor: COLORS.white,
  },
});

export default LoginScreen;


