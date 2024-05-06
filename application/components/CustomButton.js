import React from 'react';
import {View, TouchableOpacity, I18nManager} from 'react-native';
import Styles from '../config/Styles';
import { Text } from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';

export default function CustomButton(props) {

		const {Icon, Label, Click} = props;

		const navigation = useNavigation();

		return(
			<TouchableScale activeOpacity={1} activeScale={0.98} tension={100} friction={10} onPress={Click}>
			<View style={Styles.Button1}>
			<Icons name={Icon} style={Styles.Button1IconLeft} />
			<Text style={Styles.Button1Text}>{Label}</Text>
			<Icons name={I18nManager.isRTL ? "chevron-left" : "chevron-right"} style={Styles.Button1IconRight} />
			</View>
			</TouchableScale>
			);
}