import React from 'react';
import {FlatList, Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { fetchBooksRequestingByUserId } from '../redux/slice/bookSlice';
import { colors, sizes } from '../constants/theme';

const Item = ({navigation, product}) => {
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
            backgroundColor: 'green',
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
            Trả
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const BooksReceived = ({navigation,booksReceived}) => {
  
  const user = useSelector(state => state.user.userInfo);

  return (
    <View style={{flex: 1, paddingVertical: 8}}>
      {booksReceived.length > 0 ? (
          <FlatList
            data={booksReceived}
            renderItem={({item}) => (
              <Item
                product={item}
                navigation={navigation}
                userId={user.userId}
              />
            )}
            keyExtractor={item => item.bookId}
          />
        ) : 
        <Text
          style={{
            textAlign: 'center',
            color: colors.white,
            marginTop: 16,
            fontSize: 20,
          }}>
          Chưa có yêu cầu nào
        </Text>
      }
    </View>
  );
};

export default BooksReceived;
