import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../constants/theme';

export default function BookNew({navigation, booksNew, typeBook}) {
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
        Mới
      </Text>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, gap: 16}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {booksNew.map(item =>
          item.type == typeBook ? (
            <View key={item.bookId} style={styles.bookItem}>
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
              </TouchableOpacity>
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  );
}

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
  },
  bookTitle: {
    textAlign: 'center',
    color: colors.textColor,
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '600',
  },
});
