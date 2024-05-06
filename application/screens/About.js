import React, { useState, useEffect } from 'react';
import { getStrings } from "../config/DataApp";
import { View, ScrollView, Image, useWindowDimensions } from 'react-native';
import HTMLView from 'react-native-render-html';
import { HTMLStyles } from '../config/HTMLStyles';
import AppLoading from '../components/AppLoading';
import Styles from '../config/Styles';
import Strings from '../config/Strings';

export default function About() {

const { width } = useWindowDimensions();
const [isLoaded, setIsLoaded] = useState(false);
const [item, setItem] = useState('');

useEffect(() => {

  getStrings().then((response) => {
    setItem(response[0]);
    setIsLoaded(true);
  });

}, []);

  if (isLoaded) {

 return (

	<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <View style={Styles.TermsAboutPageScreen}>
    <Image source={require('../../assets/logo.png')} resizeMode={"contain"} style={Styles.PageLogo} />
    <HTMLView source={{html: item.st_aboutus ? item.st_aboutus : `<p></p>`}} contentWidth={width} tagsStyles={HTMLStyles}/>
    </View>
    </ScrollView>

      );

   }else{
   return (
     <AppLoading/>
     );
 }
 
}

