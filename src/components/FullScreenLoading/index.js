import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function FullScreenLoading({ iconColor, bgColor }) {
  return(
    <View style={{
      flex: 1,
      backgroundColor: `${bgColor}`,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ActivityIndicator size='large' color={ iconColor } />
    </View>
  );
}