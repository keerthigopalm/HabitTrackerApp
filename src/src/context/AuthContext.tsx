import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const flag = await AsyncStorage.getItem('loggedIn');
      setIsLoggedIn(flag === 'true');
    };
    checkLogin();
  }, []);

  const login = async () => {
    await AsyncStorage.setItem('loggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
