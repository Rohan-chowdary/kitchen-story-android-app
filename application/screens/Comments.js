import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import AppLoading from '../components/AppLoading';
import {getComments} from "../config/DataApp";
import Heading from '../components/Heading';
import { map, size } from "lodash";
import Styles from '../config/Styles';
import Strings from '../config/Strings';
import ColorsApp from '../config/ColorsApp';
import { Text, List, Badge, IconButton, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import LoadMoreButton from '../components/LoadMoreButton';
import Empty from '../components/Empty';
import Replies from '../components/Replies';
import moment from "moment";

export default function Members(props) {

  const { route } = props;
  const { navigation } = props;
  const { id } = route.params;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState('');

  const onChangeScreen = (id, name) => {
    props.navigation.navigate('singlemember', {id, name});
  };

  const onSubmitComment = (id) => {
    props.navigation.navigate('comment', {id, action: 'comment', comment: null});
  };

  const onSubmitReply = (id, comment) => {
    props.navigation.navigate('comment', {id, action: 'reply', comment});
  };

  const rightButton = () => {
    return (
      <IconButton icon="plus" size={24} onPress={() => onSubmitComment(id)}/>
      )
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => rightButton(),
    });
  }, []);

  useEffect(() => {
    getComments(id, page).then((response) => {
        setItems(response);
        setIsLoaded(true);
    });
  }, []);


  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getMembers(id, page+1).then((response) => {

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
    <View style={Styles.CommentsScreen}>

        {items && items.length ? null : <Text style={{alignSelf: 'center', marginTop: 20, opacity: 0.3}}>{Strings.ST90}</Text>}

        {map(items, (item, i) => (

  <View key={i}>
  <Card style={{marginBottom: 20, paddingBottom: 15, borderColor: 'rgba(0,0,0,0.05)', borderWidth: 1, elevation: 0}}>
    <Card.Title
    title={item.user_name}
    titleStyle={{fontSize: 16}}
    subtitleStyle={{marginTop: -6}}
    subtitle={moment(item.created).fromNow()}
    left={props => <Avatar.Image size={45} source={{uri: item.user_avatar}} />} />
    <Card.Content>
      <Paragraph>{item.body}</Paragraph>
    </Card.Content>
    <TouchableOpacity activeOpacity={0.6} onPress={() => onSubmitReply(id, item.id)} style={{position: 'absolute', top: 10, right: 10}}>
    <Text style={{fontSize: 12, color: '#999'}}>Reply</Text>
    </TouchableOpacity>
  </Card>

        <Replies Id={item.id}/>

  </View>

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

