import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GlobalWrapper} from './src/components/wrappers/GlobalWrapper';
import MainNavigator from './src/navigators/MainNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={[styles.container]}>
      <GestureHandlerRootView style={[styles.container]}>
        <CustomStatusBar />
        <NavigationContainer>
          <GlobalWrapper>
            <MainNavigator />
          </GlobalWrapper>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const CustomStatusBar: FC = () => {
  return (
    <StatusBar
      animated
      backgroundColor="rgba(0,0,0,0)"
      networkActivityIndicatorVisible={true}
      translucent
      barStyle="dark-content"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
