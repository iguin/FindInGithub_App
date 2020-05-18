import React, { useState } from 'react';
import HomeRoutes from './src/routes/homeRoutes';
import * as Font from 'expo-font';
import { StatusBar } from 'react-native';
import { colors } from './src/shared/globalStyles';
import { AppLoading } from 'expo';

const loadFont = () => Font.loadAsync({
  'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
});

export default function App() {

  const[fontLoaded, setFontLoaded] = useState(false);

  if(fontLoaded) {
    return (
      <>
        <StatusBar backgroundColor={ colors.primary } />
        <HomeRoutes />
      </>
    );
  } else {
    return(
      <AppLoading
        startAsync={() =>loadFont()}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
}
