import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, ImageBackground} from 'react-native';
import Styles from '../config/Styles';
import {map} from 'lodash';
import {getFeaturedRecipes} from "../config/DataApp";
import ConfigApp from "../config/ConfigApp";
import Strings from "../config/Strings";
import { Avatar, Button, Card, Title, Text, Badge} from 'react-native-paper';
import Heading from './Heading';
import TouchableScale from 'react-native-touchable-scale';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {Grid, Row, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FeaturedRecipes() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  
  const onChangeScreen = (id, title) => {
    navigation.navigate('recipe', {id, title});
  };

  useEffect(() => {
    getFeaturedRecipes().then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, [items]);

    return(

      <View style={{marginTop: 20}}>
      <ScrollView
          style={{width: '100%'}}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20, /*flexDirection: 'row-reverse'*/ }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
        {map(items, (item, i) => (

        <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item.id, item.title)} activeScale={0.98} tension={100} friction={10}>
        <Card style={Styles.card6}>
          <View style={Styles.totalLikes}>
          <Icon name="heart" color="red" size={18}></Icon>
          <Text style={{color: '#fff', marginLeft: 5, fontWeight: '600'}}>{item.total_likes}</Text>
          </View>
          <Badge style={Styles.badgeRightTop}>{item.category}</Badge>
          <Card.Cover source={{ uri: item.image }} style={Styles.card6View} />
          <Card.Title
          title={item.title}
          titleNumberOfLines={1}
          titleStyle={{fontWeight: 'bold', fontSize: 18, width: '100%'}} />
          <Grid style={{marginHorizontal: 15, marginBottom: 15, marginTop: 0}}>

          <Col style={Styles.ColProps2}>
          <Icon style={Styles.ColProps2Icon} name="account-outline" />
          <Text style={Styles.ColProps2Text} numberOfLines={1}>{item.servings} {Strings.ST26}</Text>
          </Col>

          <Col style={Styles.ColProps2}>
          <Icon style={Styles.ColProps2Icon} name="clock-time-three-outline" />
          <Text style={Styles.ColProps2Text} numberOfLines={1}>{item.time}</Text>
          </Col>

          </Grid>
        </Card>
        </TouchableScale>

          ))}
      </ScrollView>
      </View>

      );

}