import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../components/ProductCard';
import Entypo from 'react-native-vector-icons/Entypo';
import {clearBookRe, fetchBooksByCategoryId} from '../redux/slice/bookSlice';
import {colors} from '../constants/theme';

const Books = ({navigation}) => {
  const dispatch = useDispatch();
  const [type, setType] = useState(0);

  // const books = useSelector(state => state.book.books);
  const [booksByCategory, setBooksByCategory] = useState();
  let booknew =
    type != 0
      ? useSelector(state => state.book.booksByCategory[type])
      : useSelector(state => state.book.books);
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchBooksByCategoryId({categoryId: type}));
      setBooksByCategory(booknew);
    };
    fetch();
  }, [dispatch, type]);

  const list = [
    {
      id: 0,
      text: 'Tất cả',
    },
    {
      id: 1,
      text: 'Công Nghệ',
    },
    {
      id: 2,
      text: 'Kinh Tế',
    },
    {
      id: 3,
      text: 'Triết Học',
    },
    {
      id: 4,
      text: 'Văn Học',
    },
    {
      id: 5,
      text: 'Kiến Trúc',
    },
    {
      id: 6,
      text: 'Lịch Sử',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={1}
          underlayColor={'#ccd0d5'}>
          <Entypo
            name="chevron-left"
            style={{
              fontSize: 18,
              color: colors.white,
              padding: 10,
              borderRadius: 20,
              backgroundColor: colors.secondary,
            }}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 26, fontWeight: '700', color: colors.white}}>
          Danh sách
        </Text>
      </View>

      <View>
        <ScrollView
          style={styles.lstCat}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {list.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setType(item.id);
                }}
                style={
                  item.id == type ? styles.catButtonActive : styles.catButton
                }
                key={item.id}>
                <Text
                  style={
                    item.id == type ? styles.catTextActive : styles.catText
                  }>
                  {item.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={{flex: 1, paddingVertical: 8}}>
        <FlatList
          data={booksByCategory}
          renderItem={({item}) => (
            <ProductCard product={item} navigation={navigation} />
          )}
          keyExtractor={item => item.bookId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    gap: 8,
  },
  lstCat: {
    display: 'flex',
  },
  catButtonActive: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderColor: colors.white,
    width: 120,
    marginRight: 10,
  },
  catButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    borderColor: 'white',
    width: 120,
    marginRight: 10,
  },
  catTextActive: {
    textAlign: 'center',
    color: colors.black,
    fontWeight: '700',
  },
  catText: {
    textAlign: 'center',
    color: colors.textColor,
    fontWeight: '700',
  },
});

export default Books;
