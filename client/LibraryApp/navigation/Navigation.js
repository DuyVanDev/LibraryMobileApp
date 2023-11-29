import React from 'react';
import {useSelector} from 'react-redux';
import SignIn from '../screens/SignIn';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import Books from '../screens/Books';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import Transactions from '../screens/Transactions';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Books"
        component={Books}
        options={{
          tabBarLabel: 'Book',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transactions}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="list-alt" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  const user = useSelector(state => state.user.userInfo);
  if (user) {
    return <TabNavigator />;
  }
  return <SignIn />;
};

export default Navigation;
