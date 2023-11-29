import React from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {LogOut} from '../redux/slice/userSlice';
import {colors} from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const user = useSelector(state => state.user.userInfo);
  console.log(user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LogOut());
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: colors.white, fontSize: 32, fontWeight: '700'}}>
          Profile
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>Username: {user.userName}</Text>
        <Text style={styles.text}>Email: {user.userEmail}</Text>
        <Text style={styles.text}>Phone: {user.userPhone}</Text>
      </View>
      <TouchableOpacity
      onPress={handleLogout}
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap : 4,
          flexDirection: 'row',
        }}>
        <MaterialCommunityIcons color={colors.white} size={20} name="logout" />
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
      {/* <Text style={{color: "black"}}>{user.userName}</Text>
        <Button title='Logout' onPress={handleLogout}/> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: colors.secondary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  info: {
    paddingHorizontal: 20,
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    rowGap: 20,
  },
  text: {
    color: colors.white,
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Profile;
