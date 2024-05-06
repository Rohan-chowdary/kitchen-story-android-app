import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, List, IconButton, Button, Card, Title, Paragraph } from 'react-native-paper';
import {map, size} from 'lodash';
import Strings from '../config/Strings';
import Styles from '../config/Styles';
import ConfigApp from '../config/ConfigApp';
import { getFeed } from "../config/DataApp";
import LoadMoreButton from '../components/LoadMoreButton';
import AppLoading from '../components/AppLoading';
import Empty from '../components/Empty';
import EmptyResults from '../components/EmptyResults';
import UserContext from '../context/UserContext';
import moment from "moment";

export default function Feed(props) {

  const contextState = useContext(UserContext);
  const userInfo = contextState.user;

    const { navigation } = props;
    const [items, setItems] = useState([]);
    const [likes, setLikes] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showButton, setshowButton] = useState(true);
    const [loading, setLoading] = useState(false);


  const onClickRecipe = (id, title) => {
    navigation.navigate('recipe', {id, title});
  };

  const onClickMember = (id, name) => {
    props.navigation.navigate('singlemember', {id, name});
  };

  const onClickComments = (id) => {
    props.navigation.navigate('comments', {id});
  };

  useEffect(() => {

    getFeed(userInfo.user_id).then((response) => {
      setItems(response);
      setIsLoaded(true);
    });

  }, []);

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getFeed(userInfo.user_id, page+1).then((response) => {

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

  const renderItems = () => {

    if (!items || size(items) < 1 ) {

      return null;

    }else {

      return (
        <View>

        {map(items, (item, index) => (

    <Card key={index} mode="outlined" style={{borderColor: '#eee', marginBottom: 20}}>
      <Card.Title
      title={item.author}
      titleNumberOfLines={2}
      subtitle={moment(item.date).fromNow()}
      titleStyle={{fontSize: 16, marginVertical: 0}}
      subtitleStyle={{marginTop: -6}}
      left={props =>  <TouchableOpacity activeOpacity={1} onPress={() => onClickMember(item.author_id, item.author)}><Avatar.Image {...props} size={45} source={{uri: item.author_avatar}} /></TouchableOpacity>} />
      <TouchableOpacity activeOpacity={0.9} onPress={() => onClickRecipe(item.id, item.title)}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title style={{marginTop: 15, fontSize: 18, fontWeight: '600', paddingHorizontal: 4}}>{item.title}</Title>
      </Card.Content>
      </TouchableOpacity>
      <Card.Actions style={{marginHorizontal: 0, paddingHorizontal: 0, paddingTop: 0}}>
      <Button icon="heart" mode="text" color={"#959595"} labelStyle={Styles.feedActionLabel} uppercase={false}>{item.total_likes}</Button>
      <Button icon="comment" mode="text" color="#959595" onPress={() => onClickComments(item.id)} labelStyle={Styles.feedActionLabel} uppercase={false}>{item.total_comments}</Button>
      </Card.Actions>
    </Card>

          ))}

        </View>
        );
    }

  };

      if (isLoaded) {

  if (size(items) < 1) {

    return(
      <Empty/>
      );

  }else{
    return (

<ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
      <View style={Styles.FullHeightScreen2}>
      <List.Section>
      {renderItems()}
          {renderButton()}

      </List.Section>
      </View>
      </ScrollView>
      );
  }

     }else{
       return (
         <AppLoading/>
         );
     }

}
