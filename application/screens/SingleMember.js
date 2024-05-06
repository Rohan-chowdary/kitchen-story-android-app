import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Animated, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Divider, Avatar, List, Button} from 'react-native-paper';
import { getLogged, getMemberById, getRecipesByAuthor, checkFollow, submitFollow, submitUnFollow } from "../config/DataApp";
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

export default function RecipeDetails(props) {

  const contextState = useContext(UserContext);
  const userInfo = contextState.user;

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const { route } = props;
  const { navigation } = props;
  const { id, name } = route.params;
  const [page, setPage] = useState(1);
  const [isFollowed, setFollowed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const [data, setData] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [isLogged, setisLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeScreen = (id, title) => {
    navigation.navigate('recipe', {id, title});
  };

  const goToLogin = () => {
    navigation.navigate('login');
  };

const checkLogged = async () => {
  const response = await getLogged();
  setisLogged(response);
}

  useEffect(() => {

    props.navigation.setOptions({
      headerTransparent: true,
      headerTintColor: '#000',
      headerTitleStyle: { opacity: headerOpacity },
      headerBackground: () => (
        <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: headerOpacity,
          backgroundColor: 'rgba(255,255,255,0.9)'
        }}
        />
        ),
    });

  }, [headerOpacity, navigation]);

  useEffect(() => {

    getMemberById(id).then(response => {
        setItem(response[0]);
        setIsLoaded(true);
        checkLogged();

    });

  }, [isFollowed]);

  useEffect(() => {

        checkFollow(userInfo.user_id, id).then(token => {
            if (token === 'true') {
              setFollowed(true);
            }
          });

  }, []);

  useEffect(() => {

    getRecipesByAuthor(id).then(response => {
        setData(response);
    })

  }, []);

 const addFollow = async (UserId, itemId) => {

  if (UserId != itemId) {

  submitFollow(UserId, itemId).then(token => {
    if (token === 'followed') {
      setFollowed(true);
    }
  });

  }else{

    Alert.alert(Strings.ST71);

  }

};

const removeFollow = async (UserId, itemId) => {

 submitUnFollow(UserId, itemId).then(token => {
  if (token === 'unfollowed') {
      setFollowed(false);
  }
});

};

  const loadMore = () => {

    setLoading(true);
    setPage(page+1);

    getRecipesByAuthor(id, page+1).then((response) => {

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

const renderButtonFollow = () => {

  if (!isFollowed) {
    if (isLogged && userInfo) {
      return (

    <Button
    icon="account-plus"
    mode="outlined"
    uppercase={false}
    labelStyle={{letterSpacing: 0, fontSize: 16, color: '#000000'}}
    style={{borderRadius: 100}}
    contentStyle={{paddingHorizontal: 20, paddingVertical: 3}}
    onPress={() => addFollow(userInfo.user_id, item.id)}>
      {Strings.ST69}
    </Button>

        )
    }else{
      return (

    <Button
    icon="account-plus"
    mode="outlined"
    uppercase={false}
    labelStyle={{letterSpacing: 0, fontSize: 16, color: '#000000'}}
    style={{borderRadius: 100}}
    contentStyle={{paddingHorizontal: 20, paddingVertical: 3}}
    onPress={() => goToLogin()}>
      {Strings.ST69}
    </Button>

        )}
    }else{
      return (

    <Button
    icon="account-minus"
    mode="outlined"
    uppercase={false}
    labelStyle={{letterSpacing: 0, fontSize: 16, color: '#000000'}}
    style={{borderRadius: 100}}
    contentStyle={{paddingHorizontal: 20, paddingVertical: 3}}
    onPress={() => removeFollow(userInfo.user_id, item.id)}>
      {Strings.ST70}
    </Button>

        )
    }
}

  const renderButton = () => {

    return (
      <LoadMoreButton
      Indicator={loading}
      showButton={showButton}
      Items={data}
      Num={6}
      Click={() => loadMore()}/>
      )
  }

  if (isLoaded) {

   return (
    <Animated.ScrollView
    onScroll={Animated.event(
      [
      {
        nativeEvent: {
          contentOffset: {
            y: yOffset,
          },
        },
      },
      ],
      { useNativeDriver: true }
      )}
    scrollEventThrottle={16}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    >

    <View style={Styles.memberContent}>

    <View style={Styles.memberHeader}>
    <Avatar.Image size={130} source={{ uri: item.avatar}} />
    <View style={Styles.memberNameView}>
    <Text style={Styles.memberName}>{item.name}</Text>
    {item.verified ? <Icon name="check-decagram" size={22} style={Styles.memberBadge}/> : null}
    </View>
    <Text style={Styles.memberEmail}>{item.username}</Text>

    </View>

    <View style={{marginVertical: 20, alignSelf: 'center'}}>

    {renderButtonFollow()}

    </View>

    <Divider style={{marginBottom: 25, marginHorizontal: 10}}/>

    <Grid>
    <Col style={Styles.memberCol}>
      <Text style={Styles.memberColLabel}>{Strings.ST57}</Text>
      <Text style={Styles.memberColValue}>{item.total_likes}</Text>
    </Col>
    <Col style={Styles.memberCol}>
      <Text style={Styles.memberColLabel}>{Strings.ST58}</Text>
      <Text style={Styles.memberColValue}>{item.total_following}</Text>
    </Col>
    <Col style={Styles.memberCol}>
      <Text style={Styles.memberColLabel}>{Strings.ST59}</Text>
      <Text style={Styles.memberColValue}>{item.total_followers}</Text>
    </Col>
    </Grid>

    <Divider style={{marginVertical: 20, marginHorizontal: 10}}/>

        {data && data.length ? <Text style={Styles.memberSection}>{Strings.ST60}</Text> : <Empty/>}

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

    </Animated.ScrollView>

    );

 }else{
   return (
     <AppLoading/>
     );
 }

}


