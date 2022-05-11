import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {

  return (
    // <GestureHandlerRootView>
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
    // </GestureHandlerRootView>
  );
};



export default App;
