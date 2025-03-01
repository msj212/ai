import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import History from '../History/History';
import Favorites from '../Favorites/Favorites';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import Interview from '../Interview/Interview';
const Tab = createBottomTabNavigator();
export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2563eb',
        tabBarStyle: { backgroundColor: 'white', height: 60 },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'History') iconName = 'history';
          else if (route.name === 'Favorites') iconName = 'heart';
          else if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'user';
          else if (route.name === 'Interview') iconName = 'briefcase';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Interview" component={Interview} />
    </Tab.Navigator>
  );
}
