import React,{useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
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
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook } from '../redux/slice/bookSlice';
// import { ScrollView } from "react-native-gesture-handler";
const ProductCard = ({navigation, product}) => {
  const dispatch = useDispatch();
  const book = useSelector((state) => state.book.book);
  useEffect(() => {
    dispatch(fetchBook());
  }, [dispatch]);
  return (
    <GestureHandlerRootView>
      
      <Pressable
        onPress={() =>
          navigation.navigate('Detail', {
            product: product,
          })
        }
        style={{margin: 15, flexDirection: 'row', backgroundColor: 'white'}}>
        <View>
          <Image
            style={{
              height: sizes.height / 4,
              width: sizes.width - 280,
              backgroundColor: 'blue',
            }}
            source={{
              uri: product.bookImage,
            }}
          />
        </View>

        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{width: 200, height: 60, fontSize: 16, fontWeight: 500}}>
              {product.bookTitle}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              marginTop: 7,
            }}>
            <Text style={{fontSize: 15}}>{product.bookAuthor}</Text>
            
          </View>

          <Text
            style={{
              width: 210,
              marginTop: 6,
              color: 'gray',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {`Số bản: ${product.quantity}`}
          </Text>

          <Text style={{marginTop: 4, fontSize: 15, fontWeight: '400'}}>
            {`Lĩnh vực: ${product.category.categoryName}`}
          </Text>
        </View>
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default ProductCard;
