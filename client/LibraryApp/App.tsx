import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import Read from './screens/Read';
// import BottomTabs from './components/BottomTabs';
import Listen from './screens/Listen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './screens/SignIn';
import Detail from './screens/Detail';
import Products from './screens/Products';
import Navigation from './navigation/Navigation';
import Search from './screens/Search';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* <Navigation /> */}
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="HomeScreen" component={Navigation} />
            <Stack.Screen name="SignIn" component={SignIn} />

            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="Read" component={Read} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Listen" component={Listen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
