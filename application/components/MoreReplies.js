import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Styles from '../config/Styles';
import { Text, ActivityIndicator } from 'react-native-paper';
import Strings from "../config/Strings";
import { size } from "lodash";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorsApp from '../config/ColorsApp';

export default function MoreReplies(props){
	
	const {Indicator, showButton, Items, Click, Num } = props;

    if (size(Items) >= Num) {

  if (showButton) {
    return (
      <View style={{height: 40, width: '100%'}}>
        <TouchableOpacity activeOpacity={0.9} style={{textAlign: 'center', alignContent: 'center', justifyContent:'center', alignSelf: 'center'}} onPress={Click}>
        <Text style={{color: '#999', fontWeight: '600'}}>{!Indicator ? (Strings.ST102) : (<ActivityIndicator animating={Indicator} size={20} color={ColorsApp.PRIMARY} />)}</Text>
        </TouchableOpacity>
      </View>
    )
}else{
  return (
    <View style={{alignSelf: 'center', height: 50}}>
      <Text style={{opacity: 0.3}}>{Strings.ST90}</Text>
    </View>
  )

}
}else{
  return null
}

}

