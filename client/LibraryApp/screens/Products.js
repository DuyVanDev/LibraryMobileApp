import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
// import FavoriteButton from './FavoriteButton';
import {PLACES} from '../data';
import MainHeader from '../components/MainHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductCard from '../components/ProductCard';
import {useRoute} from '@react-navigation/native';
import api from '../api/client';
import {ActivityIndicator, Colors} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchBooksByCategoryId,
  selectBooksByCategoryId,
} from '../redux/slice/bookSlice';

const Products = ({navigation, route}) => {
  const {type} = route.params;

    const books = useSelector(state => state.book.booksByCategory[type]) || []; // Lấy trạng thái Redux

    // Lấy dữ liệu sách dựa trên danh mục ID từ trạng thái Redux

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: colors.white,
          padding: 4,
          gap: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={1}
          underlayColor={'#ccd0d5'}>
          <Entypo
            name="chevron-left"
            style={{
              fontSize: 20,
              color: colors.black,
              padding: 10,
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 26, fontWeight: '700'}}>Danh sách</Text>
      </View>
      {books ? (
        books.map(product => (
          <ProductCard
            key={product.bookId}
            navigation={navigation}
            product={product}
          />
        ))
      ) : (
        <ActivityIndicator animating={true} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default Products;
