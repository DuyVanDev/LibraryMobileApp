import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {colors, sizes} from '../constants/theme';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import useDebounce from '../hooks/useDebounce';

const Item = ({name, author, navigation, item}) => {
  return (
    <React.Fragment>
      <TouchableHighlight
        onPress={() => navigation.navigate('Detail', {product: item})}>
        <View style={styles.info}>
          <View style={styles.imgContainer}>
            <Image style={styles.imgBook} source={{uri: item.bookImage}} />
          </View>
          <View style={styles.details}>
          <Text numberOfLines={2} style={styles.textAuthor} >by: {author}</Text>
            <Text numberOfLines={3} style={styles.textTitle}>
              {name}
            </Text>
            
          </View>
        </View>
      </TouchableHighlight>
    </React.Fragment>
  );
};
const SearchData = ({navigation, searchQuery}) => {
  const product = useSelector(state => state.book.books);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChangeText = async text => {
    // setSearchText(text);
    handleSearch(text);
  };
  const debouncedSearch = useDebounce(searchQuery, 1000);

  const handleSearch = async query => {
    setLoading(true);
    //  setSearchText(query);
    const filteredResult = await product?.filter(
      item =>
        item.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
        item.bookAuthor.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredData(searchQuery.length > 0 ? filteredResult : null);
  };
  useEffect(() => {
    handleChangeText(searchQuery);
    
    if (debouncedSearch) handleSearch(searchQuery);
    setLoading(false);
  }, [searchQuery, debouncedSearch]);

  return (
    <React.Fragment>
      {searchQuery.length > 3 ? (
        <ScrollView nestedScrollEnabled={true} style={styles.container}>
          <View>
            {loading && <Text>Loading</Text>}
            <ScrollView
              horizontal={true}
              style={{width: '100%', backgroundColor: colors.primary}}>
              <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <Item
                    name={item.bookTitle}
                    author={item.bookAuthor}
                    navigation={navigation}
                    item={item}
                  />
                )}
              />
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        <ScrollView nestedScrollEnabled={true} style={{...styles.container}}>
          <View>
            <View
              horizontal={true}
              style={{
                alignItems: 'center',
                backgroundColor: colors.primary,
                height: sizes.height,
              }}>
              <Image
                source={require('../assets/images/logo.png')}
                style={{width: 100, height: 100}}
              />
              <Text>Tìm kiếm</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </React.Fragment>
  );
};

export default SearchData;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: sizes.width,
    zIndex: 10,
    height: '100%',
    backgroundColor: colors.primary,
    left: 0,
    right: 0,
    bottom: 0,
  },
  info: {
    flex: 1,
    display : "flex",
    justifyContent: "center",
    alignItems : "center",
    padding: 10,
    width: sizes.width,
    height : 200,
    marginTop: 2,
    flexDirection : "row",
    gap : 20,
  },
  imgContainer : {
    flex: 1,
    borderRadius : 10,
  },
  imgBook : {
    width : "100%",
    height : "100%",
    resizeMode : "cover",
    borderRadius : 10,

  },
  details: {
    flex : 1
  },
textAuthor : {
  color : colors.textColor,
  fontWeight: '700',
  fontSize: 14,


},

  textTitle: {
    fontSize: 20,
    fontWeight: '700',
    color : colors.white,
    textTransform: "capitalize"
  },
});
