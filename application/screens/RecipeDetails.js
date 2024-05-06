import React, { useState, useEffect, useRef, useContext } from 'react';
import { Animated, ImageBackground, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button, IconButton, Checkbox, Divider } from 'react-native-paper';
import { getRecipeById, getLogged, checkLike, submitLike, submitUnLike } from "../config/DataApp";
import Styles from '../config/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import ConfigApp from '../config/ConfigApp';
import Strings from '../config/Strings';
import ColorsApp from '../config/ColorsApp';
import {map} from 'lodash';
import AppLoading from '../components/AppLoading';
import { Col, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { renderImage } from '../config/Functions';
import { HTMLStyles } from '../config/HTMLStyles';
import ShareModal from '../components/ShareModal';
import UserContext from '../context/UserContext';

export default function RecipeDetails(props) {

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const contextState = useContext(UserContext);
  const userInfo = contextState.user;

  const { route } = props;
  const { navigation } = props;
  const { id, title } = route.params;
  const [isLoaded, setIsLoaded] = useState(false);
  const [share, setShare] = useState(false);
  const [isBookmark, setBookmark] = useState('');
  const [item, setItem] = useState([]);
  const [isLogged, setisLogged] = useState('');

  const onChangeScreen = (screen) => {
    navigation.navigate(screen);
  };

  const onClickSingleMember = (id, name) => {
    props.navigation.navigate('singlemember', {id, name});
  };

  const onClickSingleCategory = (id, name) => {
    props.navigation.navigate('singlecategory', {id, name});
  };

  const onClickComments = (id) => {
    props.navigation.navigate('comments', {id});
  };

  const openShare = () => {
    setShare(true);
  }

  const closeShare = () => {
    setShare(false);
  }

  const renderBookMark = async (UserId, itemId) => {

  checkLike(UserId, itemId).then(token => {
    if (token === 'true') {
      setBookmark(true);
    }
  });

 };

 const saveBookmark = async (UserId, itemId) => {
      setBookmark(true);
      submitLike(UserId, itemId);

};

const removeBookmark = async (UserId, itemId) => {
      setBookmark(false);
      submitUnLike(UserId, itemId);
};

const checkLogged = async () => {
  const response = await getLogged();
  setisLogged(response);
}

const renderButtonFav = () => {

  if (!isBookmark) {
    if (isLogged && userInfo) {
      return (<IconButton icon="heart-outline" size={24} style={{marginHorizontal: 0}} animated={true} onPress={() => saveBookmark(userInfo.user_id, item.id)}/>)
    }else{
      return (<IconButton icon="heart-outline" size={24} style={{marginHorizontal: 0}} animated={true} onPress={() => onChangeScreen("login")}/>)}
    }else{
      return (<IconButton icon="heart" color={"red"} size={24} style={{marginHorizontal: 0}} animated={true} onPress={() => removeBookmark(userInfo.user_id, item.id)}/>)
    }
}

const rightButtons = () => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
    <IconButton icon="share-variant" size={24}  style={{marginHorizontal: 0}} onPress={() => openShare()}/>
    {renderButtonFav()}
    </View>
    )
};

useEffect(() => {

  props.navigation.setOptions({
    title:title,
    headerTintColor: '#ffffff',
    headerTitleStyle: { opacity: headerOpacity },
    headerBackground: () => (
      <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        opacity: headerOpacity,
        backgroundColor: 'rgba(0,0,0,0.6)'
      }}
      />
      ),
  });


}, [headerOpacity]);

useEffect(() => {
      checkLogged();
}, []);

useEffect(() => {

  getRecipeById(id).then(response => {
      setItem(response[0]);
      renderBookMark(userInfo.user_id, id);
      setIsLoaded(true);
  })

}, [isBookmark]);

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

         <ImageBackground source={{uri: item.image}} resizeMode={"cover"} style={Styles.recipeBackground}>
         <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={Styles.recipeOverlay}/>
         </ImageBackground>

         <View style={Styles.recipeContent}>

         <Grid>
         <Col size={8} style={{alignItems: 'flex-start'}}>
            <View style={Styles.recipeTotalikes}>
            <Icon style={Styles.recipeTotalikesIcon} name="heart" />
            <Text style={Styles.recipeTotalikesLabel}>{item.total_likes}</Text>
            </View>
            <Text style={Styles.recipeTitle}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => onClickSingleMember(item.author_id, item.author)} activeOpacity={0.8}>
            <Text style={Styles.recipeMeta}>{Strings.ST50} {item.author}</Text>
            </TouchableOpacity>
            <Text>·</Text>
            <TouchableOpacity onPress={() => onClickSingleCategory(item.category_id, item.category)} activeOpacity={0.8}>
            <Text style={Styles.recipeMeta}>{item.category}</Text>
            </TouchableOpacity>
            <Text>·</Text>
            <TouchableOpacity onPress={() => onClickComments(id)} activeOpacity={0.8}>
            <Text style={Styles.recipeMeta}><Icon name="comment-outline" size={15}/> {item.total_comments}</Text>
            </TouchableOpacity>
            </View>

         </Col>
         <Col size={2} style={{alignItems: 'flex-start'}}>
            {rightButtons()}
         </Col>
         </Grid>

        <Divider style={{marginVertical: 15, marginHorizontal: 10}}/>

        <Grid style={{marginHorizontal: 5}}>
        <Col style={{flexDirection: 'column', alignItems: 'center' }}>
        <Icon size={35} name="account-outline" color={ColorsApp.PRIMARY} style={Styles.ColPropsIcon} />
        <Text style={{fontSize: 16, fontWeight: '600'}} numberOfLines={1}>{item.servings} {Strings.ST26}</Text>
        </Col>

        <Col style={{flexDirection: 'column', alignItems: 'center' }}>
        <Icon size={35} name="clock-time-three-outline" color={ColorsApp.PRIMARY} style={Styles.ColPropsIcon} />
        <Text style={{fontSize: 16, fontWeight: '600'}} numberOfLines={1}>{item.time}</Text>
        </Col>

        <Col style={{flexDirection: 'column', alignItems: 'center' }}>
        <Icon size={35} name="bookmark-minus-outline" color={ColorsApp.PRIMARY} style={Styles.ColPropsIcon} />
        <Text style={{fontSize: 16, fontWeight: '600'}} numberOfLines={1}>{item.difficult}</Text>
        </Col>
        </Grid>

        <Divider style={{marginVertical: 20, marginHorizontal: 10}}/>

        <Text style={Styles.recipeDescription}>{item.description}</Text>

        <Divider style={{marginVertical: 15, marginHorizontal: 10}}/>

        <Text style={Styles.recipeSection}>{Strings.ST47}</Text>

        <Divider style={{marginVertical: 15, marginHorizontal: 10}}/>

        {map(item.ingredients, (label, i) => (
          <View key={i} style={Styles.recipeIngredients}>
          <Icon name="check" style={Styles.recipeIngredientsIcon}></Icon>
          <Text style={Styles.recipeIngredientsLabel}>{label}</Text>
          </View>
        ))}

        <Divider style={{marginVertical: 15, marginHorizontal: 10}}/>

        <Text style={Styles.recipeSection}>{Strings.ST49}</Text>

        <Divider style={{marginVertical: 15, marginHorizontal: 10}}/>

        {map(item.instructions, (label, i) => (
          <View key={i} style={Styles.recipeInstructions}>
          <Text style={Styles.recipeIngredientsNum}>{i+1}</Text>
          <Text style={Styles.recipeIngredientsLabel}>{label}</Text>
          </View>
        ))}

        <Divider style={{marginVertical: 15, marginHorizontal: 10}}/>

        <Text style={Styles.recipeSection}>{Strings.ST51}</Text>

        <Divider style={{marginVertical: 15, marginHorizontal: 10}}/>

        <Grid>
        <Col style={Styles.recipeNutriCol}>
          <Text style={Styles.recipeNutriColLabel}>{Strings.ST52}</Text>
          <Text style={Styles.recipeNutriColValue}>{item.kcal}</Text>
        </Col>
        <Col style={Styles.recipeNutriCol}>
          <Text style={Styles.recipeNutriColLabel}>{Strings.ST53}</Text>
          <Text style={Styles.recipeNutriColValue}>{item.fat}</Text>
        </Col>
        <Col style={Styles.recipeNutriCol}>
          <Text style={Styles.recipeNutriColLabel}>{Strings.ST54}</Text>
          <Text style={Styles.recipeNutriColValue}>{item.protein}</Text>
        </Col>
        <Col style={Styles.recipeNutriCol}>
          <Text style={Styles.recipeNutriColLabel}>{Strings.ST55}</Text>
          <Text style={Styles.recipeNutriColValue}>{item.carbs}</Text>
        </Col>
        </Grid>

        <View style={{height: 50}}></View>

         </View>

          <ShareModal isVisible={share} closeModal={closeShare} isPost={false} itemData={item}/>

         </Animated.ScrollView>

           );

     }else{
       return (
         <AppLoading/>
         );
     }

   }


