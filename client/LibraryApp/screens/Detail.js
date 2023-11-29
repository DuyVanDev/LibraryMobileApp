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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addBookRecently, startReading} from '../redux/slice/bookSlice';
import api from "../api/client"

const Detail = ({navigation, route}) => {
  const {product} = route.params;
  const user = useSelector(state => state.user.userInfo)
  const booksRecently = useSelector(state => state.book.booksRecently);
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
  const handleBorrow = async (bookId, userId) => {
    const response = await api.post(`/api/Transaction/borrow?bookId=${bookId}&userId=${userId}`)
    const data = await response.data;
    if(data) {
      console.log(data)
    }

  }
  const handleListen = () => {
    navigation.navigate('Listen', {
      product,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo
              name="chevron-left"
              style={{
                fontSize: 18,
                color: colors.white,
                padding: 12,
                borderRadius: 20,
                backgroundColor: colors.lightGray,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{
                color: colors.textColor,
                fontSize: 20,
                fontWeight: '600',
                width: 250,
                textAlign: 'center',
              }}>
              {product.bookTitle}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: colors.textColor,
                fontSize: 16,
                fontWeight: '500',
                width: 250,
                textAlign: 'center',
              }}>
              by: {product.bookAuthor}
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="bookmark"
              style={{
                fontSize: 24,
                color: colors.white,
                paddingVertical: 12,
                borderRadius: 4,
                backgroundColor: colors.primary,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bookImage}>
          <Image style={styles.image} source={{uri: product.bookImage}} />
        </View>
        <View style={styles.desc}>
          <Text style={{fontSize: 18, color: colors.white, fontWeight: '500'}}>
            Mô tả: {product.description}
          </Text>
        </View>
      </ScrollView>
        {product.type == 'book' ? (
          <View style={styles.bottom}>
            <TouchableOpacity onPress={handleRead} style={styles.buttonBottom}>
              <Text style={styles.textBottom}>
                {isBookExist ? 'Đọc tiếp' : 'Đọc'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleBorrow(product.bookId, user.userId)}
              style={styles.buttonBottom}>
              <Text style={styles.textBottom}>
                Mượn
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.bottom}>
            <TouchableOpacity
              onPress={handleListen}
              style={styles.buttonBottom}>
              <Text style={styles.textBottom}>
                Nghe
              </Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 8,
  },

  bookImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 30,
    marginBottom: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  desc: {
    marginTop: 12,
    marginBottom: 50,
  },

  bottom: {
    position: 'absolute',

    backgroundColor: colors.primary,
    flexDirection: 'row',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 8,
    bottom: 0,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBottom: {
    width: '35%',
    height: '90%',
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBottom: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.black,
    textTransform: 'uppercase',
  },
});
