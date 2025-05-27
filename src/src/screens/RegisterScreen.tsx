import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../utils/colors';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    if (!name || !email || !password) {
      Alert.alert('All fields are required');
      return;
    }

    const user = { name, email, password };
    const usersData = await AsyncStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    users.push(user);
    await AsyncStorage.setItem('users', JSON.stringify(users));

    Alert.alert('Registered successfully!');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={register} color={COLORS.primary} />
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

export default RegisterScreen;
