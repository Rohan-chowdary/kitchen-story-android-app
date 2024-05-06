import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Strings from "../config/Strings";

export default function Empty(props){

		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>{Strings.ST30}</Text>
			</View>
			);
}