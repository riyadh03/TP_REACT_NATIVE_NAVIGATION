import React from 'react';
import { View, Text } from 'react-native';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#e8e8e8', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18 }}>⚙ Paramètres</Text>
    </View>
  );
}

export default SettingsScreen;
