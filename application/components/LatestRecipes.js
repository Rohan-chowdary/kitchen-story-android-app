import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {getLatestRecipes} from "../config/DataApp";
import ConfigApp from "../config/ConfigApp";
import Heading from './Heading';
import TouchableScale from 'react-native-touchable-scale';
import { map, size } from "lodash";
import { Avatar, Button, Card, Badge, List, Title, Text, IconButton} from 'react-native-paper';
import Strings from '../config/Strings';
import { LinearGradient } from 'expo-linear-gradient';
import {Grid, Row, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LoadMoreButton from './LoadMoreButton';
import EmptyResults from './EmptyResults';

export default function LatestProperties() {

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  
  const onChangeScreen = (id, title) => {
    navigation.navigate('recipe', {id, title});
  };
  
  useEffect(() => {
    getLatestRecipes().then((response) => {
        setItems(response);
    });
  }, []);

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getLatestRecipes(page+1).then((response) => {

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

    return(

      <View style={{width: '100%', marginTop: 20}}>

        {map(items, (item, i) => (

        <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98} tension={100} friction={10}>
        <ImageBackground source={{uri: item.image}} style={Styles.background_card} imageStyle={{borderRadius: 8}}>
          <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.gradient_card}>

          <View style={Styles.totalLikes}>
          <Icon name="heart" color="red" size={18}></Icon>
          <Text style={{color: '#fff', marginLeft: 5, fontWeight: '600'}}>{item.total_likes}</Text>
          </View>
          
            <Text numberOfLines={2} style={Styles.title_card}>{item.title}</Text>
            <Text numberOfLines={2} style={Styles.subtitle_card}>
            <Icon style={Styles.ColProps3Icon} name="account-outline" />{' '}{item.servings} {Strings.ST26}
            {'    '}
            <Icon style={Styles.ColProps3Icon} name="clock-time-three-outline" />{' '}{item.time}
            </Text>

          </LinearGradient>
        </ImageBackground>
        </TouchableScale>

          ))}

        {renderButton()}


      </View>

      );

}