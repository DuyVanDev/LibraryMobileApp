import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import MainHeader from '../components/MainHeader';
import {colors} from '../constants/theme';
import Categories from '../components/Categories';
import BookNew, {localRestaurants} from '../components/BookNew';
import {useDispatch, useSelector} from 'react-redux';
import Popular from '../components/Popular';
import {
  clearBookRe,
  fetchBook,
  fetchBooksNew,
  fetchBooksPopular,
} from '../redux/slice/bookSlice';
import RecentlyBooks from '../components/RecentlyBooks';
import Recommend from '../components/Recommend';
import Decorate from '../components/Decorate';
// import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
  const [typeBook, setTypeBook] = useState('book');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const booksNew = useSelector(state => state.book.booksNew);
  const booksPopular = useSelector(state => state.book.booksPopular);
  const booksRecently = useSelector(state => state.book.booksRecently);
  useEffect(() => {
    setIsLoading(true);
       dispatch(fetchBooksPopular());
       dispatch(fetchBooksNew());
       dispatch(fetchBook());
    setIsLoading(false);
    
  }, [dispatch]);
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader navigation={navigation} valueStart={1} valueEnd={0}/>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <Text style={styles.heading}>Welcome T-Library!</Text>
        {/* <Categories navigation={navigation} /> */}
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={
              typeBook == 'book' ? styles.typeButtonActive : styles.typeButton
            }
            onPress={() => setTypeBook('book')}>
            <Text
              style={
                typeBook == 'book' ? styles.typeTextActive : styles.typeText
              }>
              Books
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              typeBook == 'audio' ? styles.typeButtonActive : styles.typeButton
            }
            onPress={() => setTypeBook('audio')}>
            <Text
              style={
                typeBook == 'audio' ? styles.typeTextActive : styles.typeText
              }>
              Audio
            </Text>
          </TouchableOpacity>
        </View>
        {booksRecently.length > 0 ? (
          <RecentlyBooks booksRecently={booksRecently} navigation={navigation}/>
        ) : null}
        {isLoading==false ? (
          <Recommend
            typeBook={typeBook}
            navigation={navigation}
            booksPopular={booksPopular}
          />
        ) : (
          <Text style={{fontSize : 16, color: colors.white, fontWeight : "600"}}>Loading...</Text>
        )}
        
        <Decorate />
        {isLoading == false ? (
          <BookNew
            typeBook={typeBook}
            booksNew={booksNew}
            navigation={navigation}
          />
        ) : (
          <Text style={{fontSize : 16, color: colors.white, fontWeight : "600"}}>Loading...</Text>
        )}
        {/* booksNew={booksNew} navigation={navigation}  */}
        {/* <Popular navigation={navigation} books={booksPopular} /> */}
      </ScrollView>
      {/* <Divider width={1} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
    backgroundColor: colors.primary,
    position: 'relative',
  },
  body: {
    flex: 1,
    zIndex: 0,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    position: 'relative',
  },
  heading: {
    fontSize: 50,
    color: colors.white,
    fontWeight: '600',
  },
  typeContainer: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#252030',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: 20,
    marginBottom: 24,
  },
  typeButton: {
    borderColor: '#252030',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 20,
    borderRadius: 12,
  },
  typeButtonActive: {
    borderColor: '#252030',
    borderWidth: 2,
    backgroundColor: 'white',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 20,
    borderRadius: 12,
  },
  typeText: {
    fontWeight: '700',
    color: colors.white,
  },
  typeTextActive: {
    fontWeight: '700',
    color: colors.black,
  },
});

export default HomeScreen;
