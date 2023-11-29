import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Image,
  SafeAreaView,
  Easing,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, sizes} from '../constants/theme';
import SearchData from './SearchData';
import api from '../api/client';
import { Divider } from 'react-native-paper';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const MainHeader = ({navigation, valueStart, valueEnd}) => {
  
  const [searchText, setSearchText] = useState('');
  const [showSeachData, setShowSearchData] = useState(false);
  


  const handleHideSearchData = () => {
    setShowSearchData(false);
  };
  const handleShowSearchData = () => {
    setShowSearchData(true);
  };

  const slideAnimation = React.useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    // handleShowSearchData();
  };

  const animateView = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    handleHideSearchData();
    setSearchText("")
    console.log(searchText)
    setShowSearchData(false)
    navigation.navigate("Home")
  };

  const handleSubmit = async () => {
    if(searchText.trim().length > 0) {
      navigation.navigate("Search",{searchText})
    }
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_inner}>
          <View>
            <Image
              style={styles.img}
              source={require('../assets/images/logo.png')}
            />
          </View>
          <View style={{
            backgroundColor: colors.secondary,
            width : 120,
            height: 28,
            borderRadius : 20
          }}></View>
          <TouchableOpacity
            activeOpacity={1}
            underlayColor={'#ccd0d5'}
            onPress={handleFocus}>
            <Icon
              style={{
                color: colors.white,
                backgroundColor: colors.secondary,
                borderRadius: 40,
                padding: 10,
              }}
              onPress={() => navigation.navigate("Search")}
              name="search-outline"
              size={23}
            />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            styles.searchBox,
            {
              marginLeft: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [450, 0],
              }),
            },
          ]}>
          <TouchableHighlight activeOpacity={1} underlayColor={'#ccd0d5'}>
            <AnimatedIcon
              name="chevron-back"
              onPress={animateView}
              size={20}
              style={[styles.searchIcon]}
            />
          </TouchableHighlight>

          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm..."
            placeholderTextColor={colors.white}     
            onFocus={handleFocus}
            onChangeText={text => setSearchText(text)}
            onSubmitEditing={handleSubmit}
            value={searchText}
          />
        </Animated.View>
      </View>
      <View style={styles.list_data}>
        
        {showSeachData == true ? (
          <SearchData
            searchQuery={searchText}
            navigation={navigation}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: colors.primary,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal : 12,
  },
  img: {
    width: 30,
    height: 40,
  },
  header_inner: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical : 12,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius : 10
  },
  searchIcon: {
    padding: 10,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    color: colors.white,
  },
  input: {
    marginLeft: 6,
    backgroundColor: colors.secondary,
    flex : 1,
    color: colors.white,
    paddingVertical : 10,
    borderRadius : 10
    
  },
  
  list_data: {
    position: 'relative',
    left: 0,
    right: 0,
  },
});

export default MainHeader;
