import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabLayout from './component/loyout/TabLayout';
import Header from './component/loyout/Header';

export default function App() {
  return (
    <NavigationContainer> 
      <View style={styles.container}>
        <Header />
        <TabLayout /> 
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
