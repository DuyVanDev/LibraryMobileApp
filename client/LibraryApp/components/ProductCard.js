import React, {useEffect} from 'react';
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
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const ProductCard = ({navigation, product}) => {
  return (
    <GestureHandlerRootView>
      <Pressable
        onPress={() =>
          navigation.navigate('Detail', {
            product: product,
          })
        }
        style={{
          marginTop:20 ,
          flexDirection: 'row',
          backgroundColor: colors.white,
          borderRadius : 10
        }}>
        <View>
          <Image
            style={{
              height: sizes.height / 4,
              width: sizes.width - 280,
              backgroundColor: 'blue',
              borderRadius : 10
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
            <Text numberOfLines={3}
              style={{width: 200, fontSize: 16, fontWeight: 500}}>
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
            {`Loại: ${product.type}`}
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
