import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/theme';
import {Divider} from 'react-native-paper';



export default function BookNew({navigation, booksNew}) {
  return (
    <View
      style={{
        paddingVertical: 10,
        paddingLeft: 20,
        borderRadius: 50,
      }}>
      <Text style={{paddingVertical: 10, fontSize: 24, fontWeight: '500'}}>
        New books
      </Text>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, gap: 16}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {booksNew.map(item => (
          <View key={item.bookId}>
            <Pressable
              onPress={
                () => {
                  navigation.navigate('Detail', {
                    product: item,
                  });
                }
               
              }>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <View
                  style={{
                    borderRadius: 8,
                    width: 110,
                    height: 140,
                    backgroundColor: 'blue',
                  }}>
                  <Image
                    source={{uri: item.bookImage}}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                      borderRadius: 8,
                    }}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={{fontSize: 15, fontWeight: '600', width: 120}}>
                  {item.bookTitle}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{fontSize: 13, fontWeight: '600', color : "#538bde",padding: 4, backgroundColor : "#dcefff",alignSelf: "flex-start"}}>
                  Free
                </Text>
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
    
  );
}

