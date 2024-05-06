import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Animated, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Divider, Avatar, List, Button} from 'react-native-paper';
import { getRecipesByCategory } from "../config/DataApp";
import Styles from '../config/Styles';
import ConfigApp from '../config/ConfigApp';
import Strings from '../config/Strings';
import ColorsApp from '../config/ColorsApp';
import {map} from 'lodash';
import AppLoading from '../components/AppLoading';
import { Col, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadMoreButton from '../components/LoadMoreButton';
import Empty from '../components/Empty';
import EmptyResults from '../components/EmptyResults';
import UserContext from '../context/UserContext';

export default function SingleCategory(props) {

  const contextState = useContext(UserContext);
  const userInfo = contextState.user;

  const { route } = props;
  const { navigation } = props;
  const { id, name } = route.params;
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChangeScreen = (id, title) => {
    navigation.navigate('recipe', {id, title});
  };

useEffect(() => {

  props.navigation.setOptions({
    title:name,
  });

}, []);

  useEffect(() => {

    getRecipesByCategory(id).then(response => {
        setData(response);
        setIsLoaded(true);
    })

  }, []);

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getRecipesByCategory(id, page+1).then((response) => {

      if (!data) {
        setData(response);
        setLoading(false);
      }else{
        setData([...data, ...response]);
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
      Items={data}
      Num={10}
      Click={() => loadMore()}/>
      )
  }

  if (isLoaded) {

   return (
    <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    >

    <View style={Styles.PageScreen}>


        {map(data, (item, i) => (

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


        {renderButton()}

    <View style={{height: 50}}></View>

    </View>

    </ScrollView>

    );

 }else{
   return (
     <AppLoading/>
     );
 }

}


