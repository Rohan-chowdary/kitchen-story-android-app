import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import AppLoading from '../components/AppLoading';
import {getMembers} from "../config/DataApp";
import Heading from '../components/Heading';
import { map, size } from "lodash";
import Styles from '../config/Styles';
import Strings from '../config/Strings';
import ColorsApp from '../config/ColorsApp';
import { Text, List, Avatar } from 'react-native-paper';
import LoadMoreButton from '../components/LoadMoreButton';
import EmptyResults from '../components/EmptyResults';

export default function Members(props) {

  const { route } = props;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState('');

  const onChangeScreen = (id, name) => {
    props.navigation.navigate('singlemember', {id, name});
  };

  useEffect(() => {
    getMembers(page).then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);


  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getMembers(page+1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      }else{
        setItems([...items, ...response]);
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
      <LoadMoreButton
      Indicator={loading}
      showButton={showButton}
      Items={items}
      Num={10}
      Click={() => loadMore()}/>
      )
  }

  if (isLoaded) {

      return(

    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
    <View style={Styles.MembersScreen}>

        {map(items, (item, i) => (

        <List.Item
        key={i}
        title={item.name}
        description={item.username}
        titleStyle={{fontWeight: 'bold', marginBottom: 3}}
        descriptionStyle={{fontSize: 16}}
        onPress={() => onChangeScreen(item.id, item.name)}
        activeOpacity={1}
        titleNumberOfLines={2}
        underlayColor="#ffffff"
        rippleColor="rgba(0, 0, 0, .01)"
        left={props => <Avatar.Image size={80} style={{marginRight: 10}} source={{uri: item.avatar}} />}
        right={props => <List.Icon {...props} icon="chevron-right" style={{alignSelf: 'center', opacity: 0.3}} />}
      />

          ))}

        {renderButton()}

    </View>

    <View style={{height: 80}}></View>

    </ScrollView>

        );

  }else{
   return (
     <AppLoading/>
     );
 }
 
}

