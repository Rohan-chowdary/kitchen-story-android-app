import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Styles from '../config/Styles';
import { Text, ActivityIndicator } from 'react-native-paper';
import Strings from "../config/Strings";
import { size } from "lodash";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorsApp from '../config/ColorsApp';

export default function LoadMoreButton(props){
	
	const {Indicator, showButton, Items, Click, Num } = props;

    if (size(Items) >= Num) {

  if (showButton) {
    return (
      <View style={{height: 100, width: '100%', marginTop: 20}}>
        <TouchableOpacity activeOpacity={0.9} style={Styles.LoadMore} onPress={Click}>
        <Text style={{color: ColorsApp.PRIMARY, fontWeight: '600'}}>{!Indicator ? (Strings.ST111) : (<ActivityIndicator animating={Indicator} size={20} color={ColorsApp.PRIMARY} />)}</Text>
        </TouchableOpacity>
      </View>
    )
}else{
  return (
    <View style={Styles.NoMoreItems}>
      <Text style={{opacity: 0.3}}>{Strings.ST112}</Text>
    </View>
  )

}
}else{
  return null
}

}

