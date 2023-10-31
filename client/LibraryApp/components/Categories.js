import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchBooksByCategoryId } from '../redux/slice/bookSlice';
import { colors } from '../constants/theme';

const items = [
  {
    id: 1,
    image: require('../assets/images/images.jpg'),
    text: 'Công Nghệ',
  },
  {
    id: 2,
    image: require('../assets/images/images.jpg'),
    text: 'Kinh Tế',
  },
  {
    id: 3,
    image: require('../assets/images/images.jpg'),
    text: 'Triết Học',
  },
  {
    id: 4,
    image: require('../assets/images/images.jpg'),
    text: 'Văn Học',
  },
  {
    id: 5,
    image: require('../assets/images/images.jpg'),
    text: 'Kiến Trúc',
  },
  {
    id: 6,
    image: require('../assets/images/images.jpg'),
    text: 'Lịch Sử',
  },
];


export default function Categories({navigation}) {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingLeft: 20,
      }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map(item => (
          <View key={item.id} style={{alignItems: 'center', marginRight: 30}}>
            <Pressable
              onPress={() => {
                dispatch(fetchBooksByCategoryId({categoryId : item.id}))
                navigation.navigate('Products',{type : item.id})
              }
                
              }>
              <Image
                source={item.image}
                style={{
                  width: 50,
                  height: 40,
                  resizeMode: 'contain',
                }}
              />
              <Text style={{fontSize: 13, fontWeight: '900'}}>{item.text}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
