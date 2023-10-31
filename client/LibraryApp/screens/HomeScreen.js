import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import MainHeader from '../components/MainHeader';
import {colors} from '../constants/theme';
import Categories from '../components/Categories';
import BookNew, {localRestaurants} from '../components/BookNew';
import { useDispatch, useSelector } from 'react-redux';
import Popular from '../components/Popular';
import { fetchBook, fetchBooksNew, fetchBooksPopular } from '../redux/slice/bookSlice';
// import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const dispatch = useDispatch()
  const booksNew = useSelector((state) => state.book.booksNew)
  const booksPopular = useSelector((state) => state.book.booksPopular)
  useEffect(() => {
    dispatch(fetchBooksNew())
    dispatch(fetchBooksPopular())
    dispatch(fetchBook())

  },[dispatch])
  
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1,  zIndex: 0, position : "relative"}}>
      <MainHeader
        navigation={navigation}
        
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories navigation={navigation} />
        <BookNew
          booksNew={booksNew}
          navigation={navigation}
        />
        <Popular navigation={navigation} books={booksPopular}/>

      </ScrollView>
      {/* <Divider width={1} /> */}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    zIndex: 0,
  },
});

export default HomeScreen;
