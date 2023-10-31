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

const Item = ({name, author, navigation,item}) => {
  return (
    <React.Fragment>
      <TouchableHighlight onPress={() => navigation.navigate('Detail',{product : item})}>
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.textName}>{name}</Text>
          <Text>{author}</Text>
        </View>
      </TouchableHighlight>
    </React.Fragment>
  );
};
const SearchData = ({navigation, searchQuery}) => {
  const [products, setProducts] = useState([]);
  const product = useSelector(state => state.book.books);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleChangeText = async text => {
    // setSearchText(text);
    handleSearch(text);
  };

  const handleSearch = async query => {
    //  setSearchText(query);
    const filteredResult = await product?.filter(
      item =>
        item.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
        item.bookAuthor.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(searchQuery.length > 0 ? filteredResult : null);
    console.log(filteredData)

  };

  useEffect(() => {
    handleChangeText(searchQuery);
  }, [searchQuery]);

  return (
    <React.Fragment>
      {searchQuery.length > 3 ? (
        <ScrollView nestedScrollEnabled={true} style={styles.container}>
          <View>
            <ScrollView horizontal={true} style={{width: '100%'}}>
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
                backgroundColor: colors.light,
                top: '10%',
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
    backgroundColor: colors.light,
    left: 0,
    right: 0,
    bottom: 0,
  },
  info: {
    flex: 1,
    padding: 10,
    width: sizes.width,
    backgroundColor: '#ccd0d5',
    marginTop: 2,
  },

  textName: {
    fontSize: 16,
    width : "100%",
    fontWeight: 'bold',
  },
  textRate: {},
});
