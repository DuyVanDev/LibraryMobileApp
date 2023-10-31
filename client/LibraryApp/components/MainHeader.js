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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, sizes} from '../constants/theme';
import SearchData from './SearchData';
import api from '../api/client';
import { Divider } from 'react-native-paper';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const MainHeader = ({navigation}) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
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
    handleShowSearchData();
  };

  const animateView = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    handleHideSearchData();
  };

  

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
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'#ccd0d5'}
            onPress={handleFocus}>
            <Icon
              style={{
                color: colors.black,
                backgroundColor: '#e4e6eb',
                borderRadius: 40,
                padding: 10,
              }}
              name="search-outline"
              size={23}
            />
          </TouchableHighlight>
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
            onFocus={handleFocus}
            onChangeText={text => setSearchText(text)}
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
      <Divider style={{height: 2}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: colors.white,
  },
  header: {
    height: 60,
  },
  img: {
    width: 30,
    height: 40,
  },
  header_inner: {
    position: 'absolute',
    paddingHorizontal: 16,
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
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    alignItems: 'center',
  },
  searchIcon: {
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#e4e6eb',
    color: 'black',
  },
  input: {
    height: 60,
    marginLeft: 6,
    backgroundColor: '#f3f3f3',
    width: sizes.width,
    color: 'black',
  },
  modalContent: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'blue',
    top: 60,
    marginTop: 60,
    left: 0,
    right: 0,
  },
  list_data: {
    position: 'relative',
    left: 0,
    right: 0,
  },
});

export default MainHeader;
