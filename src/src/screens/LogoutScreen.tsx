import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation }: any) => {
  useEffect(() => {
    const logout = async () => {
      // await AsyncStorage.clear();
      await AsyncStorage.removeItem('loggedIn');
      await AsyncStorage.removeItem('loggedInEmail');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    };

    logout();
  }, []);

  return null;
};

export default LogoutScreen;
