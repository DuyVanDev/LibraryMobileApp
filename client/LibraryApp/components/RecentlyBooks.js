import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors} from '../constants/theme';

const RecentlyBooks = ({booksRecently,navigation}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.textColor,
          fontWeight: '500',
          fontSize: 16,
          marginBottom: 4,
        }}>
       Xem gần đây
      </Text>
      <View style={styles.containerBooks}>
        <View style={styles.lstBook}>
          {booksRecently.slice(0,3).map(item => (
            <View key={item.bookId} style={styles.bookItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Detail', {
                    product: item,
                  })
                }>
                <Image style={styles.bookImg} source={{uri: item.bookImage}} />
                <Text numberOfLines={1} style={styles.bookTitle}>
                  {item.bookTitle}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: '-60%',
            borderRadius: 100,
            backgroundColor: '#241e37',
            height: 200,
            width: 200,
            display: 'flex',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 30,
              color: colors.white,
              fontSize: 16,
              fontWeight: '500',
            }}>
            Chọn sách
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBooks: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    overflow: 'hidden',
  },
  lstBook: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    padding: 12,
    paddingBottom: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  bookItem: {
    flex: 1,
  },
  bookImg: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  bookTitle: {
    textAlign: 'center',
    color: colors.textColor,
    textTransform: 'uppercase',
    fontSize: 11,
    paddingTop: 10,
    fontWeight: 'bold',
  },
});

export default RecentlyBooks;
