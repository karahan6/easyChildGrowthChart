import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './store';
import { Provider } from 'react-redux';
import { Startup } from './components/Startup';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <StoreProvider store={store}>
          <SafeAreaProvider>
            <Startup>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </Startup>
          </SafeAreaProvider>
        </StoreProvider>
      </Provider>
    );
  }
}
