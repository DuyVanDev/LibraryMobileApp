import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors, sizes} from '../constants/theme';
import {useSelector} from 'react-redux';
import MainHeader from '../components/MainHeader';
import Icon from 'react-native-vector-icons/Ionicons';

const Item = ({name, author, navigation, item}) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {product: item})}>
        <View style={styles.info}>
          <View style={styles.imgContainer}>
            <Image style={styles.imgBook} source={{uri: item.bookImage}} />
          </View>
          <View style={styles.details}>
            <Text numberOfLines={2} style={styles.textAuthor}>
              by: {author}
            </Text>
            <Text numberOfLines={3} style={styles.textTitle}>
              {name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};
const Search = ({navigation, route}) => {
  const product = useSelector(state => state.book.books);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setFilteredData([]);
    setRamSearchText(searchTerm)
  };
  const handleSearch = async query => {
    //  setSearchText(query);
    setLoading(true);
    const filteredResult = await product?.filter(
      item =>
        item.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
        item.bookAuthor.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filteredResult);
    setLoading(false);

  };
  useEffect(() => {
    // if (debouncedSearch) handleSearch(searchQuery);
    setLoading(true);
    handleSearch(searchTerm)
  }, [searchTerm]);

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <View style={styles.searchBox}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          activeOpacity={1}
          underlayColor={'#ccd0d5'}>
          <Icon style={styles.searchIcon} name="chevron-back" size={20} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm..."
          placeholderTextColor={colors.white}
          onChangeText={text => setSearchTerm(text)}
          onSubmitEditing={handleSubmit}
          value={searchTerm}
        />
      </View>

      <View>
        {loading ? (
          <Text>Loading</Text>
        ) : (
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
        )}
      </View>
    </ScrollView>
  );
};

export default Search;
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: sizes.width,
    height: 200,
    marginTop: 2,
    flexDirection: 'row',
    gap: 20,
  },
  imgContainer: {
    flex: 1,
    borderRadius: 10,
  },
  imgBook: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  details: {
    flex: 1,
  },
  textAuthor: {
    color: colors.textColor,
    fontWeight: '700',
    fontSize: 14,
  },

  textTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    textTransform: 'capitalize',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal : 12,
  },
  searchIcon: {
    padding: 10,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    color: colors.white,
  },
  input: {
    marginLeft: 6,
    backgroundColor: colors.secondary,
    flex: 1,
    color: colors.white,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
