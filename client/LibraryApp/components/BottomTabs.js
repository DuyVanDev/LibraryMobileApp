import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import Test from './Test';
import HomeScreen from '../screens/HomeScreen';
import Detail from '../screens/Detail';
import Products from '../screens/Products';
import Read from './Read';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={Test}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Read" component={Read} />
    </Stack.Navigator>
  );
};
const BottomTabs = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="HomeScreen" component={TabNavigator} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Read" component={Read} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
