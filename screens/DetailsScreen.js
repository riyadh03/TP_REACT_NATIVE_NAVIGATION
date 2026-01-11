import React from 'react';
import { View, Text } from 'react-native';

function DetailsScreen({ route }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff4e6', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
     
      <Text style={{ fontSize: 20 }}>📄 Détails</Text>

      {route.params && (
        <Text style={{ marginTop: 10 }}>ID reçu : {route.params.id}</Text>
      )}
    </View>
  );
}

export default DetailsScreen;
