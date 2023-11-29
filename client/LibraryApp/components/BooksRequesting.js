import React, { useEffect } from 'react';
import {Image, Pressable, Text, TouchableOpacity, View,FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBooksRequestingByUserId} from '../redux/slice/bookSlice';
import { colors, sizes } from '../constants/theme';
import api from "../api/client"
const Item = ({product, navigation,handleCancel,userId}) => {

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Detail', {
          product: product,
        })
      }
      style={{
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 10,
      }}>
      <View>
        <Image
          style={{
            height: sizes.height / 4,
            width: sizes.width - 280,
            backgroundColor: 'blue',
            borderRadius: 10,
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
            numberOfLines={3}
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
          <Text style={{fontSize: 14, fontWeight: '700'}}>
            by: {product.bookAuthor}
          </Text>
        </View>

        <Text style={{marginTop: 4, fontSize: 14, fontWeight: '700'}}>
          {`Lĩnh vực: ${product.category.categoryName}`}
        </Text>
        <TouchableOpacity
          onPress={() => handleCancel(product.bookId, userId)}
          style={{
            marginTop: 4,
            paddingVertical: 12,
            backgroundColor: 'red',
            width: 60,
            borderRadius: 8,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '700',
              color: colors.white,
            }}>
            Hủy
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const BooksRequesting = ({navigation, booksRequesting}) => {
 
  const user = useSelector(state => state.user.userInfo);
  const handleCancel = async (bookId, userId) => {
    const response = await api.post(
      `/api/Transaction/cancel?bookId=${bookId}&userId=${userId}`,
    );
   
  };
 
 
  
  return (
    <View style={{flex: 1, paddingVertical: 8}}>
      {booksRequesting.length > 0 ? (
        <FlatList
          data={booksRequesting}
          renderItem={({item}) => (
            <Item
              product={item}
              navigation={navigation}
              handleCancel={handleCancel}
              userId={user.userId}
            />
          )}
          keyExtractor={item => item.bookId}
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            color: colors.white,
            marginTop: 16,
            fontSize: 20,
          }}>
          Chưa có yêu cầu nào
        </Text>
      )}
    </View>
  );
};

export default BooksRequesting;
