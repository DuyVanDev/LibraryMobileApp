import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Pdf from 'react-native-pdf';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { stopReading } from '../redux/slice/bookSlice';

const Read = ({navigation, route}) => {
  const {product} = route.params;
  const dispatch = useDispatch();
  const book = useSelector(state => state.book.booksRecently)

  const PdfResource = {
    uri: product.fileUpLoad,
    caches: true,
  };
  const result = useSelector(state => {
    return state.book.booksRecently.find(
      book => book.bookId == product.bookId,
    );
  });

  
  const [pageCurrent, setPageCurrent] = useState(result.currentPage || 1);
  const handleBack = () => {
    navigation.goBack();
    handleStopReading();
  };
  const handleStopReading = () => {
    // Ngừng đọc sách với bookId cụ thể
    dispatch(stopReading({bookId :product.bookId, currentPage : pageCurrent}))
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <TouchableHighlight onPress={handleBack}>
          <Entypo
            name="chevron-left"
            style={{
              fontSize: 18,
              color: colors.black,
              padding: 12,
              backgroundColor: colors.white,
              borderRadius: 10,
            }}
          />
        </TouchableHighlight>
      </View>
      <Pdf
        page={pageCurrent}
        source={PdfResource}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          setPageCurrent(page)
        }}
        trustAllCerts={false}
        style={styles.pdf}
      />
    </GestureHandlerRootView>
  );
};

export default Read;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
