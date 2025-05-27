import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateHabitScreen from '../screens/CreateHabitScreen';
import HabitListScreen from '../screens/HabitListScreen';
import ProgressScreen from '../screens/ProgressScreen';
import LogoutScreen from '../screens/LogoutScreen';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Habits':
            iconName = 'list';
            break;
          case 'Create':
            iconName = 'add-circle';
            break;
          case 'Progress':
            iconName = 'bar-chart';
            break;
          case 'Logout':
            iconName = 'exit';
            break;
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#7B2CBF',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#F5F3FF',
        borderTopColor: '#E0AAFF',
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Habits" component={HabitListScreen} />
    <Tab.Screen name="Create" component={CreateHabitScreen} />
    <Tab.Screen name="Progress" component={ProgressScreen} />
    <Tab.Screen name="Logout" component={LogoutScreen} />
  </Tab.Navigator>
);

export default MainNavigator;
