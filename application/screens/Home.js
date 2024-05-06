import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import AppLoading from '../components/AppLoading';
import FeaturedRecipes from '../components/FeaturedRecipes';
import FeaturedCategories from '../components/FeaturedCategories';
import LatestRecipes from '../components/LatestRecipes';
import { LinearGradient } from 'expo-linear-gradient';
import Heading from '../components/Heading';
import Styles from '../config/Styles';
import Strings from '../config/Strings';
import ColorsApp from '../config/ColorsApp';
import { Title, Text } from 'react-native-paper';

export default function Home(props) {

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const [isLoaded, setIsLoaded] = useState(true);

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

useEffect(() => {

  props.navigation.setOptions({
    title: Strings.ST1,
    headerTransparent: true,
    headerTintColor: '#ffffff',
    headerTitleStyle: { opacity: headerOpacity },
    headerBackground: () => (
      <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        opacity: headerOpacity,
        backgroundColor: ColorsApp.PRIMARY
      }}
      />
      ),
  });


}, [headerOpacity]);

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

      <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={Styles.homeOverlay}/>
        
        <ImageBackground source={require('../../assets/header.jpg')} resizeMode={"cover"} style={Styles.headerBackground}>
          <View style={Styles.headerOverlay}>
          <Title style={Styles.headerTitle}>{Strings.ST21}</Title>
          <TouchableOpacity onPress={() => onChangeScreen('search')} activeOpacity={0.9}>
          <View style={Styles.headerButton}><Text style={Styles.headerButtonText}>{Strings.ST22}</Text></View>
          </TouchableOpacity>
          </View>
        </ImageBackground>
    
<SafeAreaView>

    <View style={Styles.HomeScreen}>

        <Heading title={Strings.ST23}/>
        <FeaturedRecipes/>

        <Heading title={Strings.ST24}/>
        <FeaturedCategories/>

        <Heading title={Strings.ST25}/>
        <LatestRecipes/>

    </View>
    </SafeAreaView>
    </Animated.ScrollView>

      );

   }else{
   return (
     <AppLoading/>
     );
 }
 
}

