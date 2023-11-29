import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {colors} from '../constants/theme';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import api from '../api/client';
import {Formik} from 'formik';
import { useDispatch,useSelector } from 'react-redux';
import { LoginSuccess } from '../redux/slice/userSlice';


const SignIn = () => {
  const dispatch = useDispatch()
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const user = useSelector(state=>state.user.userInfo)
  console.log(user)
  const handleSubmitForm = async (email, password) => {
    const response = await api({
      method: 'post',
      url: '/api/User/Login',
      data: {
        email: email,
        password: password,
      },
      headers:{
        "Content-Type":'multipart/form-data'
      }
    })

    const data = await response.data;
    if(data) {
      dispatch(LoginSuccess(data))
    }
    else{
      console.log("err")
    }
    
      
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo}/>
        <Text style={{textAlign: "center", color: colors.white,fontWeight : "500", fontSize: 28}}>T-Library</Text>
      </View>
      <View style={styles.login_form}>
        <Formik
          initialValues={{email: '', password : ''}}
          onSubmit={ values => handleSubmitForm(values.email, values.password)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <TextInput
                onChangeText={handleChange('email')}
                placeholder='Email'
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <TextInput
                onChangeText={handleChange('password')}
                placeholder='Password'
                onBlur={handleBlur('password')}
                secureTextEntry={true}
                value={values.password}
                style={{marginVertical : 8}}
              />
              <Button style={styles.button} onPress={handleSubmit}><Text style={{color: colors.black, fontSize : 18}}>Login</Text></Button>
            </View>
          )}
        </Formik>
        
      </View>
      <View>
        <TouchableOpacity onPress={() => alert(1)}>
          <Text
            style={{
              textAlign: 'right',
              textDecorationLine: 'underline',
              color: colors.lightGray,
            }}>
            Forgot password
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{rowGap: 12}}>
        {/* <Button theme={{roundness: 30}} style={styles.button}>
          Login
        </Button> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              textDecorationLine: 'underline',
              color: colors.white,
              fontSize: 15,
            }}>
            Don't have an account?
          </Text>
          <Text> </Text>
          <TouchableOpacity onPress={() => alert(1)}>
            <Text
              style={{
                textAlign: 'right',
                textDecorationLine: 'underline',
                color: colors.blue,
                fontSize: 15,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    rowGap: 12,
    textAlignVertical: 'center',
  },
  logoContainer: {
    display : "flex",
    alignSelf : "center",
    justifyContent : "center",
    width : 140,
    height : 140,
    marginBottom : 20,
  },
  logo: {
    width : "100%",
    height : "90%",
    resizeMode : "cover"
  },
  login_form: {
    display: 'flex',
    rowGap: 12,
  },
  button: {
    paddingVertical: 10,
    marginHorizontal : 50,
    backgroundColor: colors.blue,
    color : colors.black,
  },
  input: {
    backgroundColor: 'transparent',
  },
});
