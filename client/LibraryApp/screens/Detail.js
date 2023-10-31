import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {colors, sizes} from '../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addBookRecently, startReading} from '../redux/slice/bookSlice';

const Detail = ({navigation, route}) => {
  const {product} = route.params;
  
  const booksRecently = useSelector((state) => state.book.booksRecently)
  const isBookExist = booksRecently.some(item => item.bookId == product.bookId);
  const {bookId} = product;

  const dispatch = useDispatch();

  const handleRead = () => {
    navigation.navigate('Read', {
      product,
    });
    dispatch(addBookRecently({...product}));
    // dispatch(startReading({bookId: bookId}));
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.black} barStyle="dark-content" />
      <View style={styles.prev_icon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name="chevron-left"
            style={{
              fontSize: 18,
              color: colors.black,
              padding: 12,
              borderRadius: 4,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container_image}>
          <View style={styles.image}>
            <Image
              source={{uri: product.bookImage}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 4,
            marginTop: 30,
            marginBottom: 52,
          }}>
          <View>
            <Text style={styles.title}>{product.bookTitle}</Text>
          </View>

          <Text style={{color: '#06070D', textAlign: 'center', marginTop: 12}}>
            {' '}
            {product.bookAuthor}
          </Text>

          <Text style={styles.desc}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={handleRead}
          style={{
            width: '30%',
            height: '90%',
            backgroundColor: colors.black,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: colors.white,
              textTransform: 'uppercase',
            }}>
            
            {isBookExist ? "Đọc tiếp" : "Đọc"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            width: '35%',
            height: '90%',
            backgroundColor: colors.black,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: colors.white,
              textTransform: 'uppercase',
            }}>
            Mượn
            {/* {product.isAvailable ? 'Add to cart' : 'Not Avialable'} */}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    position: 'relative',
  },
  container_image: {
    paddingVertical: 16,
    
    width: '100%',
    backgroundColor: colors.light,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  prev_icon: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: sizes.width,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginVertical: 4,
    color: colors.black,
    maxWidth: '84%',
  },
  desc: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '400',
    letterSpacing: 1,
    opacity: 0.5,
    lineHeight: 20,
    maxWidth: '85%',
    maxHeight: 58,
    marginBottom: 18,
    marginTop: 18,
  },

  info: {
    fontSize: 32,
    color: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 100,
    marginRight: 10,
  },
  bottom: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 20,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingTop: 4,
    bottom: 20,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
