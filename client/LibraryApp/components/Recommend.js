import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../constants/theme';
const Recommend = ({booksPopular,navigation, typeBook}) => {
  return (
    <View
      style={{
        marginTop: 16,
      }}>
      <Text
        style={{
          color: colors.textColor,
          fontWeight: '500',
          fontSize: 16,
          marginBottom: 4,
        }}>
        Gợi ý
      </Text>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, gap: 16}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {booksPopular.map(item => (
          item.type == typeBook ?<View key={item.bookId} style={styles.bookItem}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail', {
                product: item,
              });
            }}>
            <Image style={styles.bookImg} source={{uri: item.bookImage}} />
            <Text numberOfLines={1} style={styles.bookTitle}>
              {item.bookTitle}
            </Text>
            <Text numberOfLines={1} style={styles.bookAuthor}>
              {item.bookAuthor}
            </Text>
          </TouchableOpacity>
        </View> : null
        ))}
      </ScrollView>
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
    // height: 240,
    // overflow: 'hidden',
  },
  lstBook: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  bookItem: {
    width: 150,
    height: 200,
  },
  bookImg: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 4,
  },
  bookTitle: {
    textAlign: 'center',
    color: colors.textColor,
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '600',
  },
  bookAuthor: {
    textAlign: 'center',
    color: colors.textColor,
    textTransform: 'capitalize',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default Recommend;
