import React, { useState, useEffect } from 'react';
import { getStrings } from "../config/DataApp";
import { View, ScrollView, SafeAreaView, useWindowDimensions } from 'react-native';
import { HTMLStyles } from '../config/HTMLStyles';
import HTMLView from 'react-native-render-html';
import Styles from '../config/Styles';
import AppLoading from '../components/AppLoading';
import Strings from '../config/Strings';

export default function Terms() {

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
    <SafeAreaView>
    <View style={Styles.TermsAboutPageScreen}>
    <HTMLView source={{html: item.tr_termsandconds ? item.tr_termsandconds : `<p></p>`}} contentWidth={width} tagsStyles={HTMLStyles}/>
    </View>
    </SafeAreaView>
    </ScrollView>

      );

    }else{
   return (
     <AppLoading/>
     );
 }
 
}

