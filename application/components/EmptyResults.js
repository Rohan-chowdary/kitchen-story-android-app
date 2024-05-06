import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Title, Subheading, Button } from 'react-native-paper';
import Strings from "../config/Strings";
import { useNavigation } from '@react-navigation/native';

export default function EmptyResults(){

	const navigation = useNavigation();

	return(
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
		<Title style={{fontWeight: 'bold'}}>{Strings.ST65}</Title>
		<Subheading style={{textAlign: 'center', marginVertical: 10, marginHorizontal: 30}}>{Strings.ST66}</Subheading>
		</View>
		);
}