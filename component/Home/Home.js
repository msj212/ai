import React from 'react';
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2563eb' }}>Home Screen</Text>
    </View>
  );
}
