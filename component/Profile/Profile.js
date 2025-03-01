import React from 'react';
import { View, Text } from 'react-native';

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#9333ea' }}>Profile Screen</Text>
    </View>
  );
}
