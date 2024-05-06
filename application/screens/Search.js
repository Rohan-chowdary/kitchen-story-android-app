import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import AppLoading from '../components/AppLoading';
import {searchApi} from "../config/DataApp";
import Heading from '../components/Heading';
import { map, size } from "lodash";
import Styles from '../config/Styles';
import Strings from '../config/Strings';
import ColorsApp from '../config/ColorsApp';
import { Text, List, Avatar, Searchbar } from 'react-native-paper';
import LoadMoreButton from '../components/LoadMoreButton';
import EmptyResults from '../components/EmptyResults';

export default function Search(props) {

  const { route } = props;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setshowButton] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState('');

  const onChangeScreen = (id, title) => {
    props.navigation.navigate('recipe', {id, title});
  };

  useEffect(() => {

      searchRequest();
      setIsLoaded(true);

  }, [query]);

  const searchRequest = () => {

      if (size(query) >= 3) {

            searchApi(query, page).then((response) => {
              setResults(response);
              setTotal(response.length);
            });
      }

  }

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    searchApi(query, page).then((response) => {

      if (!results) {
        setResults(response);
        setLoading(false);
      }else{
        setResults([...results, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };

  const renderButton = () => {

    return (
      <LoadMoreButton Indicator={loading} showButton={showButton} Items={items} Num={10} Click={() => loadMore()}/>
      )
  }

  if (isLoaded) {

      return(

    <View>

    <Searchbar
    placeholder={Strings.ST56}
    autoCorrect={false}
    autoCapitalize='none'
    onIconPress={() => searchRequest()}
    onChangeText={(e) => setQuery(e)}
    style={Styles.SearchInput}
    inputStyle={Styles.SearchInputStyle} />
    
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
    
    <View style={Styles.SearchScreen}>

        {map(results, (item, i) => (

        <List.Item
        key={i}
        title={item.title}
        titleStyle={{fontWeight: 'bold', marginBottom: 3}}
        onPress={() => onChangeScreen(item.id, item.title)}
        activeOpacity={1}
        titleNumberOfLines={2}
        underlayColor="#ffffff"
        rippleColor="rgba(0, 0, 0, .01)"
        left={props => <Avatar.Image size={80} style={{marginRight: 10}} source={{uri: item.image}} />}
        right={props => <List.Icon {...props} icon="chevron-right" style={{alignSelf: 'center', opacity: 0.3}} />}
      />

          ))}


      {results.length <= 0 && size(query) >= 3 ? <View style={{marginTop: 50}}><EmptyResults/></View> : null }
  

    </View>

    <View style={{height: 80}}></View>

    </ScrollView>

    </View>

        );

  }else{
   return (
     <AppLoading/>
     );
 }
 
}

